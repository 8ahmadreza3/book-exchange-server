const mongoose = require('mongoose')
const categoriesSchema = new mongoose.Schema({
  categoryName: String
})

const categoriesModel = mongoose.model('Category', categoriesSchema)

module.exports = categoriesModel
