const mongoose = require('mongoose')
const categoriesSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 4
  },
  address: { type: String, unique: true },
  isRecommend: { type: Boolean, default: false }
})

const categoriesModel = mongoose.model('Category', categoriesSchema)

module.exports = categoriesModel
