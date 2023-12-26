const mongoose = require('mongoose')

const booksSchema = new mongoose.Schema({
  name: String,
  birthYear: Number,
  deadYear: { type: Number, default: 0 },
  bioGraphy: String,
  books: Array
})

const booksModel = mongoose.model('Books', booksSchema)

module.exports = booksModel
