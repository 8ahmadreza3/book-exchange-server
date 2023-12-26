const mongoose = require('mongoose')

const authorSchema = new mongoose.Schema({
  name: String,
  birthYear: Number,
  deadYear: { type: Number, default: 0 },
  bioGraphy: String,
  books: Array
})

const authorModel = mongoose.model('Author', authorSchema)

module.exports = authorModel
