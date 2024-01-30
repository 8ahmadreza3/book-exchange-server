const express = require('express')
const router = express.Router()
const booksController = require('../controllers/books')

router.post('/', booksController.addBook)
router.get('/', booksController.listBook)
router.get('/:address', booksController.infoBook)
router.delete('/:address', booksController.deleteBook)
router.patch('/:address', booksController.updateBook)

module.exports = router
