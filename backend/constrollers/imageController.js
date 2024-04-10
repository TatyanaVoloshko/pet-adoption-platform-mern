// controllers/imageController.js
const aws = require('aws-sdk');
const s3 = new aws.S3();
const path = require('path'); // for local images



// retrieves an image from AWS S3 bucket and serves it to the client
// @param: key from the request parameters ( file's name or identifier in the S3 bucket)
//  AWS SDK's s3.getObject method: retrieves the specified image
// readStream.pipe(res): displays the image in the client's browser (also for downloads)
exports.serveImage = async (req, res) => {
    const { key } = req.params;

    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key,
    };

    try {
        const readStream = s3.getObject(params).createReadStream();

        readStream.on('error', function(err) {
            console.error('Stream error in serveImage:', err);
            // Important: Prevent any further actions like res.send() if headers already sent
            if (!res.headersSent) {
                res.status(500).send('Error serving image');
            }
        });

        // Pipe the S3 object stream directly to the response
        readStream.pipe(res);
    } catch (err) {
        console.error('Error serving image from S3:', err);
        // Check if headers were already sent to prevent the error
        if (!res.headersSent) {
            res.status(500).send('Error serving image');
        }
    }
};




// serveAlternativeImage: serves as a fallback mechanism to serve images stored locally, not on S3
// @param: imageName
// constructs an absolute path to the image file stored within the server's public/alternative-images
// used __dirname in order to get the absolute path of the image
// instead of "./", the relative path
exports.serveAlternativeImage = (req, res) => {
    const imageName = req.params.imageName;
    const imagePath = path.join(__dirname, '..', 'public', 'alternative-images', imageName);

    res.sendFile(imagePath, (err) => {
        if (err) {
            console.log(err);
            res.status(404).send('Image not found.');
        }
    });
};