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
  info: { type: String, default: '' },
  img: { type: String, default: '' },
  address: { type: String, default: '' },
  isRecommend: { type: Boolean, default: false },
  awsKey: { type: String, default: '' }
})

const BooksModel = mongoose.model('Books', booksSchema)

module.exports = BooksModel
