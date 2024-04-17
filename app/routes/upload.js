const express = require('express')
const router = express.Router()
const uploadController = require('../controllers/uploadImg')

router.post('/img', uploadController.uploadImg)

module.exports = router
