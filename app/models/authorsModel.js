const mongoose = require('mongoose')

const authorSchema = new mongoose.Schema({
  name: String,
  birthYear: Number,
  deadYear: { type: Number, default: -1 },
  bioGraphy: String,
  img: String,
  address: String
})

const authorModel = mongoose.model('Author', authorSchema)

module.exports = authorModel
