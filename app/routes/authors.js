const express = require('express')
const router = express.Router()
const authorController = require('../controllers/auhtors')

router.post('/', authorController.addAuthor)
router.get('/', authorController.authorsList)

module.exports = router
