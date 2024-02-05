const express = require('express')
const router = express.Router()
const authController = require('../controllers/authSMS/confirm')

router.get('/:number', authController.confirm)
router.patch('/:number', authController.forgotPass)

module.exports = router
