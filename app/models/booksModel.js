const mongoose = require('mongoose')

const booksSchema = new mongoose.Schema({
  name: String,
  author: String,
  category: String,
  info: String
})

const booksModel = mongoose.model('Books', booksSchema)

module.exports = booksModel
