const mongoose = require('mongoose')
const categoriesSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3
  },
  address: { type: String, unique: true }
})

const categoriesModel = mongoose.model('Category', categoriesSchema)

module.exports = categoriesModel
