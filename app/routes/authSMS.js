const express = require('express')
const router = express.Router()
const authController = require('../controllers/authSMS/confirm')

router.get('/:phone', authController.confirm)
router.patch('/:phone', authController.forgotPass)

module.exports = router
