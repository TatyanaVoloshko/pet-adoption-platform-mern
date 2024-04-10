const express = require('express')
const { createPet, getPets, getPet, deletePet, updatePet } = require('../constrollers/petControllers')


const router = express.Router()


router.get('/', getPets)

router.get('/:id', getPet)

router.post("/", createPet);

router.delete("/:id", deletePet);

router.patch("/:id", updatePet);



module.exports = router