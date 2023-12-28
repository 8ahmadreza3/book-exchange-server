const express = require('express')
const router = express.Router()
const booksController = require('../controllers/books')

router.post('/', booksController.addBook)
router.get('/', booksController.listBook)

module.exports = router
