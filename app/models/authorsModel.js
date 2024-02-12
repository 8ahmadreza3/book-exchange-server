const mongoose = require('mongoose')

const authorSchema = new mongoose.Schema({
  name: { type: String, minlength: 3 },
  birthYear: Number,
  deadYear: { type: Number, default: -1 },
  bioGraphy: String,
  img: String,
  address: { type: String, unique: true },
  isRecommend: { type: Boolean, default: false },
  awsKey: String
})

const authorModel = mongoose.model('Author', authorSchema)

module.exports = authorModel
