const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const middleWare = require('../middleware/authMiddleware');

// Route definitions
router.post('/signup', UserController.applicationSignup);
router.get('/get-all-user', middleWare.tokenAuthendication, UserController.getAllUsers);
router.get('/get-user/by/:userId', middleWare.tokenAuthendication, UserController.getSingleUserById);

module.exports = router;
