const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth')

router.get('/:phone', authController.confirm)
router.get('/token/:token', authController.authToken)
router.patch('/:userAuth', authController.forgotPass)

module.exports = router
