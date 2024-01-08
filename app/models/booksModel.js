const mongoose = require('mongoose')

const booksSchema = new mongoose.Schema({
  name: String,
  author: String,
  category: String,
  info: String,
  img: String,
  address: String
})

const BooksModel = mongoose.model('Books', booksSchema)

module.exports = { BooksModel, booksSchema }
