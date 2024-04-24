const express = require('express')
const router = express.Router()
const authorController = require('../controllers/authors')
const authAdmin = require('../middlewares/authAdmin')

router.post('/', [authAdmin], authorController.addAuthor)
router.get('/', authorController.listAuthor)
router.get('/recommend', authorController.recommend)
router.get('/:address', authorController.infoAuthor)
router.delete('/:address', [authAdmin], authorController.deleteAuthor)
router.patch('/:address', [authAdmin], authorController.updateAuthor)

module.exports = router
