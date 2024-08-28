const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
const middleWare = require('../middleware/authMiddleware');

// Route definitions
router.post('/login', AuthController.applicationLogin);
module.exports = router;
