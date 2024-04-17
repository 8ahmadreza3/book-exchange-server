const express = require('express')
const router = express.Router()
const uploadController = require('../controllers/upload')

router.post('/img', uploadController.uploadImg)

module.exports = router
