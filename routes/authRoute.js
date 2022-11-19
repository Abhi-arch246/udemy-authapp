const express = require('express')
const { verify } = require('jsonwebtoken')
const authMiddleware = require('../config/authMiddleware')
const { registerUser, loginUser, userData, updateUser, verifyMail } = require('../controllers/authController')
const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/userdata', authMiddleware, userData)
router.post('/update', updateUser)
router.post('/verify-mail', verifyMail)

module.exports = router