const express = require('express')
const router = express.Router()
const authorController = require('../controllers/authors')

router.post('/', authorController.addAuthor)
router.get('/', authorController.listAuthor)
router.get('/:id', authorController.infoAuthor)

module.exports = router
