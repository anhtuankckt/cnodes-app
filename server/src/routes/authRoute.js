const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const authMiddleware = require('../middlewares/authMiddleware')

// Create Account
router.post('/create-account', authController.signup)

// Login
router.post('/login', authController.login)

// Get User
router.get('/get-user', authMiddleware.authenticateToken, authController.getUser)

module.exports = router