const mongoose = require('mongoose')

const authorSchema = new mongoose.Schema({
  name: { type: String, minlength: 4 },
  birthYear: String,
  deadYear: { type: String, default: -1 },
  biography: { type: String, default: '' },
  img: { type: String, default: '' },
  address: { type: String, unique: true },
  isRecommend: { type: Boolean, default: false },
  awsKey: { type: String, default: '' }
})

const authorModel = mongoose.model('Author', authorSchema)

module.exports = authorModel
