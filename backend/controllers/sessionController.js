//controllers/sessionController.js

const jwt = require('jsonwebtoken');

/*Checks the token of the user
* If token is valid sets the isLoggedIn status to true
* Else sets the status to false*/

exports.checkSessionStatus = (req, res) => {
    // Assuming you set a cookie named 'token' upon login
    const token = req.cookies.token;
    console.log("sessionController: checkSessionStatus // Checking the token\n")
    if (!token) {
        return res.json({ isLoggedIn: false });
    }

    console.log("sessionController: checkSessionStatus // isLoggedIn, does token exist? If not, set to false\n");

    try {
        jwt.verify(token, process.env.JWT_SECRET);
        // Token is valid
        console.log("sessionController: checkSessionStatus // isLoggedIn, verify token with jwt. If token is not valid, set to false\n");

        res.json({ isLoggedIn: true });
    } catch (error) {
        // Token verification failed
        res.json({ isLoggedIn: false });
    }
};
