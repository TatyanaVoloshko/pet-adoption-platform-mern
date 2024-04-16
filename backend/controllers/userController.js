// controllers/userController.js
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Assuming your model file is named User.js


exports.getUser = async (req, res) => {
    try {
        // Assuming req.user is populated from authentication middleware (e.g., jwtMiddleware)
        const userId = req.user._id;

        // Modify the query to populate the petPosts field
        const user = await User.findById(userId)
            .populate('petPosts'); // This line is added to populate the petPosts

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Render the userProfile page, passing in user data with petPosts populated
        res.render('pages/userProfile', {
            user: user // This object now contains all user details including populated petPosts
        });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).render('pages/error', { message: "An error occurred while fetching the user profile." });
    }
};

exports.updateUserProfile = async (req, res) => {
    try {
        const userId = req.user._id; // Extracted from JWT after authentication
        const userToUpdate = await User.findById(userId);

        if (!userToUpdate) {
            return res.status(404).send("User not found.");
        }

        let updatedData = {};
        Object.keys(req.body).forEach(key => {
            if (req.body[key] && req.body[key] !== userToUpdate[key]) {
                updatedData[key] = req.body[key];
            }
        });

        // Check if there's an uploaded file and directly use the S3 key
        if (req.files && req.files.length > 0) {
            // Since it's for a profile photo, we're only interested in the first file req.files[0]
            updatedData.userPhoto = req.files[0].key; // store the S3 key
        }



        // If password is provided, hash it before updating
        if (req.body.password) {
            updatedData.password = await bcrypt.hash(req.body.password, 12);
        }

// Debugging to confirm execution of this block
        if (req.file) {
            console.log("Processing file upload:", req.file.key);
            updatedData.userPhoto = req.file.key;
        } else {
            console.log("No file uploaded.");
        }

        console.log("Updated Data:", updatedData);


        await User.findByIdAndUpdate(userId, updatedData, { new: true });

        // Redirect to the user profile page or send a success response
        res.redirect('/profile');
    } catch (error) {
        console.error('Error updating user profile:', error);
        res.status(500).send("Error updating user profile.");
    }
};


