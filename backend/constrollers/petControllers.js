const Pet = require("../models/PetModel");
const mongoose = require('mongoose')
const { GridFSBucket } = require('mongodb')
const fs = require('fs')

const savePhotoToGridFS = async (file) => {
  const db = mongoose.connection.db;
  const bucket = new GridFSBucket(db);

  return new Promise((resolve, reject) => {
    const uploadStream = bucket.openUploadStream(file.originalname);
    const readStream = fs.createReadStream(file.path);

    readStream.pipe(uploadStream);

    uploadStream.on("finish", () => {
      fs.unlinkSync(file.path); // Удаляем временный файл изображения
      resolve(uploadStream.id);
    });

    uploadStream.on("error", (error) => {
      reject(error);
    });
  });
};


const getPets = async (req, res) => {
    const pets = await Pet.find({}).sort({ createdAt: -1 })
    
    res.status(200).json(pets)
}

const getPet = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such pet" });
    }
    
    const pet = await Pet.findById(id)

    if (!pet) {
        return res.status(404).json({error: 'No such pet'})
    }

     res.status(200).json(pet)
}



const createPet = async (req, res) => {
 
  const photosFile = req.file

     const {
       name,
       species,
       breed,
       age,
       color,
       gender,
       price,
       description,
      
       adoptionStatus,
       owner,
     } = req.body;
     try {
       const pet = await Pet.create({
         name,
         species,
         breed,
         age,
         color,
         gender,
         price,
         description,
         adoptionStatus,
         owner,
       });

   
       // Сохраняем файл изображения в MongoDB с использованием GridFS
       const fileId = await savePhotoToGridFS(photosFile);

       // Обновляем созданного питомца с ID файла изображения
       await Pet.findByIdAndUpdate(pet._id, { $push: { photos: fileId } });

       res.status(200).json(pet);
     } catch (error) {
       res.status(400).json({ error: error.message });
     }
}

const deletePet = async (req, res) => {
     const { id } = req.params;

     if (!mongoose.Types.ObjectId.isValid(id)) {
       return res.status(404).json({ error: "No such pet" });
    }
    
    const pet = await Pet.findOneAndDelete({ _id: id })
    
     if (!pet) {
       return res.status(404).json({ error: "No such pet" });
     }
     res.status(200).json(pet)
}

const updatePet = async (req, res) => {
      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such pet" });
    }
    
    const pet = await Pet.findOneAndUpdate({ _id: id }, {
        ...req.body
    })
 if (!pet) {
   return res.status(404).json({ error: "No such pet" });
 }
 res.status(200).json(pet);


}


module.exports = {
    getPets,
    getPet,
    createPet,
    deletePet,
  updatePet
    
}