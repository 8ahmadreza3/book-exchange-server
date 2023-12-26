const express = require('express')
const router = express.Router()
const authorController = require('../controllers/authors')

router.post('/', authorController.addAuthor)
router.get('/', authorController.authorsList)
router.get('/:id', authorController.authorInfo)

module.exports = router
