const mongoose = require('mongoose')

const booksSchema = new mongoose.Schema({
  name: { type: String, minlength: 3 },
  author: {
    name: String,
    address: { type: String, default: '' }
  },
  category: {
    name: String,
    address: { type: String, default: '' }
  },
  info: String,
  img: String,
  address: { type: String, unique: true },
  isRecommend: { type: Boolean, default: false },
  awsKey: String
})

const BooksModel = mongoose.model('Books', booksSchema)

module.exports = BooksModel
