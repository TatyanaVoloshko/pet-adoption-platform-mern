const Pet = require("../models/PetModel");
const mongoose = require('mongoose')
const { GridFSBucket, ObjectId } = require('mongodb')
const fs = require('fs')

const savePhotoToGridFS = async (file) => {
  const db = mongoose.connection.db;
  const bucket = new GridFSBucket(db);

  return new Promise((resolve, reject) => {
    const uploadStream = bucket.openUploadStream(file.originalname);
    const readStream = fs.createReadStream(file.path);
    readStream.pipe(uploadStream);
    uploadStream.on("finish", () => {
      fs.unlinkSync(file.path); 
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
       
       const fileId = await savePhotoToGridFS(photosFile);
       await Pet.findByIdAndUpdate(pet._id, { $push: { photos: fileId } });
       res.status(200).json(pet);
     } catch (error) {
       res.status(400).json({ error: error.message });
     }
}

const deletePhotoFromGridFS = async (photoId) => {
  try {
    const db = mongoose.connection.db;
    const bucket = new GridFSBucket(db);
    await bucket.delete(new ObjectId(photoId));
    console.log(`Photo ${photoId} deleted successfully from GridFS.`);
  } catch (error) {
    console.error(`Error deleting photo ${photoId} from GridFS:`, error);
    throw error;
  }
};


const deletePet = async (req, res) => {
     const { id } = req.params;

     if (!mongoose.Types.ObjectId.isValid(id)) {
       return res.status(404).json({ error: "No such pet" });
    }
    
  const pet = await Pet.findOneAndDelete({ _id: id })
  const oldPhotoId = pet.photos[0];
  await deletePhotoFromGridFS(oldPhotoId);
    
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

  try {
    const newPhoto = req.file;
    const updatedData = { ...req.body };
    delete updatedData.photos; 
    const pet = await Pet.findById(id);
   
    if (!pet) {
      return res.status(404).json({ error: "No such pet" });
    }
    
    if (newPhoto) {
        if (pet.photos && pet.photos.length > 0) {
        const oldPhotoId = pet.photos[0];
        await deletePhotoFromGridFS(oldPhotoId);
      }
     
      const fileId = await savePhotoToGridFS(newPhoto);
      pet.photos = [fileId];
    }
   
    Object.assign(pet, updatedData);
    await pet.save();
 
    res.status(200).json(pet);
  } catch (error) {
    console.error("Error updating pet:", error);
    res.status(500).json({ error: "Failed to update pet" });
  }
};


module.exports = {
    getPets,
    getPet,
    createPet,
    deletePet,
    updatePet
    
}