const mongoose = require('mongoose')

const requestsSchema = new mongoose.Schema({
  requestId: ObjectId,
  userName: String,
  description: { type: String, default: '' },
  time: String
})

const requestModel = mongoose.model('Request', requestsSchema)

module.exports = requestModel
