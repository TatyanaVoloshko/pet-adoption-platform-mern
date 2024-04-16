//backend/middleware/upload.js

// Middleware designed for handling the files upload to S3
//  Intercepts file uploads from website form submissions,
//  processes them, and directly uploads them to an S3 bucket.
//  This middleware is attached to routes where file uploads occur,
//  such as when creating or updating pet posts with new images.
// Import necessary modules from AWS SDK v3

//Info about the cloud storage:
// Access: Bucket and objects not public

const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const multer = require('multer');

// Temporary storage for file processing
const upload = multer({ storage: multer.memoryStorage() });

// Initialize S3 client with AWS SDK v3
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
})



// Middleware for processing a single file upload
exports.uploadSingleFileToS3 = upload.single('userPhoto'); // Adjust for single file upload
// Middleware for processing multiple file uploads
exports.uploadMultipleFilesToS3 = upload.array('photos'); // Adjust for multiple files upload




// General handler for uploading files to S3
exports.handleFilesUpload = async (req, res, next) => {
  // This can handle both single and multiple files because Multer places the file(s) in req.file (single) or req.files (multiple)
  const files = req.files ? req.files : (req.file ? [req.file] : []);

  // Early return if no files were uploaded
  if (files.length === 0) {
    return next();
  }

  // Process each file
  const uploadPromises = files.map((file) => {
    const uploadParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `${Date.now()}-${file.originalname}`,
      Body: file.buffer,
    };

    const command = new PutObjectCommand(uploadParams);
    return s3Client.send(command).then(response => {
      // Assuming successful upload, add the key to the file object
      file.key = uploadParams.Key; // Store key in the file object for later use
      return response;
    });
  });

  try {
    await Promise.all(uploadPromises);
    next();
  } catch (error) {
    console.error('Error uploading files to S3:', error);
    res.status(500).send('Error uploading files');
  }
};
