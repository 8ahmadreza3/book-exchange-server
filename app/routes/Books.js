const express = require('express')
const router = express.Router()
const booksController = require('../controllers/books')

router.post('/', booksController.addBook)
router.get('/', booksController.listBook)
router.get('/:address', booksController.infoBook)
router.get('/recommend', booksController.recommend)
router.delete('/:bookID', booksController.deleteBook)
router.patch('/:bookID', booksController.updateBook)

module.exports = router
