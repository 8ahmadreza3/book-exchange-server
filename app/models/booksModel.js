const mongoose = require('mongoose')

const booksSchema = new mongoose.Schema({
  name: { type: String, minlength: 3 },
  author: String,
  category: String,
  info: String,
  img: String,
  address: { type: String, unique: true },
  isRecommend: { type: Boolean, default: false },
  awsKey: String
})

const BooksModel = mongoose.model('Books', booksSchema)

module.exports = BooksModel
