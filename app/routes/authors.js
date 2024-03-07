const express = require('express')
const router = express.Router()
const authorController = require('../controllers/authors')

router.post('/', authorController.addAuthor)
router.get('/', authorController.listAuthor)
router.get('/recommend', authorController.recommend)
router.get('/:address', authorController.infoAuthor)
router.delete('/:address', authorController.deleteAuthor)
router.patch('/:address', authorController.updateAuthor)

module.exports = router
