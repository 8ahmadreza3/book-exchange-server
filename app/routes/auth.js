const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth')

router.get('/:phone', authController.confirm)
router.get('/token/', authController.authToken)
router.patch('/:phone', authController.forgotPass)

module.exports = router
