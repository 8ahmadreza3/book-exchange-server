const express = require('express')
const router = express.Router()
const booksController = require('../controllers/allBooks')

router.get('/', booksController)

module.exports = router
