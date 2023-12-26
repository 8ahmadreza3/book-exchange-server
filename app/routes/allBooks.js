const express = require('express')
const router = express.Router()
const allBooksController = require('../controllers/allBooks')

router.post('/', allBooksController.bookAdd)
router.get('/', allBooksController.booksList)

module.exports = router
