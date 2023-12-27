const express = require('express')
const router = express.Router()
const booksController = require('../controllers/books')

router.post('/', booksController.bookAdd)
router.get('/', booksController.booksList)

module.exports = router
