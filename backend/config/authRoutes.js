//backend/config/authRoutes.js
/*Backend endpoints*/

const express = require('express');
const router = express.Router();


// to import

const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const jwtMiddleware = require('../middleware/jwtMiddleware');
const sessionController = require('../controllers/sessionController');



router.post('/register', authController.register);
router.post('/login', authController.login);

router.post('/logout', authController.logout);

// Define the route for checking session status
router.get('/session-status', jwtMiddleware, sessionController.checkSessionStatus);


module.exports = router;