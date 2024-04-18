// controllers/authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');



exports.register = async (req, res) => {
    try {
        const { name, username, email, password } = req.body;
        const userExists = await User.findOne({ $or: [{ username }, { email }] });

        if (userExists) {
            return res.status(400).json({
                success: false,
                message: "Username or email already exists."
            });
        }

        const user = new User({
            name,
            username,
            email,
            password  // Assume password will be hashed in pre-save middleware
        });

        await user.save();

        // Create a token directly after saving the new user
        const token = jwt.sign(
            { _id: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );

        // Send the token and user details back to the client
        res.cookie('token', token, { httpOnly: true, sameSite: 'Strict', maxAge: 24 * 3600000 }); // 24 hours
        res.status(201).json({
            success: true,
            isLoggedIn: true,
            message: "Registration and login successful.",
            user: {
                id: user._id,
                username: user.username,
                name: user.name,
                email: user.email
            },
            token
        });
    } catch (error) {
        console.error('Registration Error:', error);
        res.status(500).json({
            success: false,
            message: "Internal server error during registration."
        });
    }
};



exports.login = async (req, res) => { // make a more generalized function instead of usual function for express that handles http requests
    try {
        const { usernameOrEmail, password } = req.body;
        /*for testing purposes: Log the usernameOrEmail being attempted*/

        /* console.log({ usernameOrEmail }); */

        // Find the user by either username or email
        const user = await User.findOne({
            $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }]
        });

        /*for testing purposes: Log whether a user was found*/
        /* console.log({ userFound: !!user }); */

        if (!user) {
            return res.status(401).send("User not found. Please check your login details and try again.");
        }

        // Assuming `user.password` is the hashed password
        const isMatch = await bcrypt.compare(password, user.password);

        /* For testing purposes */
        /* Log whether the password matches */
        /* console.log({ isMatch }); */

        if (!isMatch) {
            return res.status(401).send("Authentication failed. Please check your login details and try again.");
        }

        // If user is found and password is correct, create a token
        const token = jwt.sign(
            { _id: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: "24h" } // Token expires in 24 hours
        );

        // Set the HttpOnly cookie
        res.cookie('token', token, {
            httpOnly: true,
            // secure: process.env.NODE_ENV === 'production', // Use secure in production
            sameSite: 'strict', // CSRF protection
            maxAge: 24 * 60 * 60 * 1000, // 24 hours
        });


        // Logging for testing purposes
        console.log(`User logged in: ${user.username} (${user.email}). Token: ${token}`);


        // Send the token to the client in response body (for storing in localStorage)
        return res.status(200).json({
            success: true,
            isLoggedIn: true,
            message: "Login successful",
            user: {
                id: user._id,
                username: user.username,
                name: user.name,
                email: user.email
            },
            token
        });
    } catch (error) {
        console.error("Login error:", error); // Log any error that occurred during the process
        return res.status(500).json({ error: "Internal server error during login." });
    }
};


exports.logout = (req, res) => {
    res.cookie('token', '', {
        httpOnly: true,
        expires: new Date(0)
    });
    res.status(200).send({ message: "User logged out successfully." });
    console.log("authController: User logged out successfully.");
};