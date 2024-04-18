const jwt = require('jsonwebtoken');

/* Checks the token of the user
 * If token is valid, sets the isLoggedIn status to true
 * Else sets the status to false
 */
exports.checkSessionStatus = (req, res) => {
    // Assuming you set a cookie named 'token' upon login
    const token = req.cookies.token;
    console.log("sessionController: checkSessionStatus // Checking the token");

    if (!token) {
        console.log("sessionController: checkSessionStatus // No token found, setting isLoggedIn to false");
        return res.json({ isLoggedIn: false });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("sessionController: checkSessionStatus // Token is valid, setting isLoggedIn to true");

        // If token is valid, set isLoggedIn to true and return user info
        res.json({
            isLoggedIn: true,
            user: {
                id: decoded._id,
                username: decoded.username,
                email: decoded.email // Assuming these fields are encoded in the token
            }
        });
    } catch (error) {
        console.log("sessionController: checkSessionStatus // Token verification failed, setting isLoggedIn to false");
        // If token verification fails, set isLoggedIn to false
        res.json({ isLoggedIn: false });
    }
};
