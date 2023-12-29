const mongoose = require('mongoose')
const categoriesSchema = new mongoose.Schema({
  name: String,
  address: String
})

const categoriesModel = mongoose.model('Category', categoriesSchema)

module.exports = categoriesModel
