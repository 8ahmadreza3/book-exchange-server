const mongoose = require('mongoose')

const requestsSchema = new mongoose.Schema({
  owner: String,
  book: Object,
  requests: Array,
  getter: String,
  time: String,
  conditions: String,
  description: String
})

const requestModel = mongoose.model('Request', requestsSchema)

module.exports = requestModel
