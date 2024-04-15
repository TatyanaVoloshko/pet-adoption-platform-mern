const express = require('express')
const { createPet, getPets, getPet, deletePet, updatePet } = require('../constrollers/petControllers')

const multer = require('multer')
const mongoose = require('mongoose')
const { GridFSBucket, ObjectId } = require("mongodb");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

const router = express.Router()

router.get('/', getPets)

router.get('/:id', getPet)

router.post("/", upload.single('photos'), createPet);

router.delete("/:id", deletePet);

router.patch("/:id", upload.single('photos'), updatePet);

router.get("/photo/:photoId", async (req, res) => {
  const photoId = req.params.photoId;
  const db = mongoose.connection.db;
  const bucket = new GridFSBucket(db);

  try {
    const downloadStream = bucket.openDownloadStream(new ObjectId(photoId));
    downloadStream.pipe(res);
  } catch (error) {
    console.error("Error downloading photo:", error);
    res.status(500).json({ error: "Failed to download photo" });
  }
});


module.exports = router