const Pet = require("../models/PetModel");
const mongoose = require('mongoose')

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
     const {
       name,
       species,
       breed,
       age,
       color,
       gender,
       price,
       description,
       photos,
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
         photos,
         adoptionStatus,
         owner,
       });
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