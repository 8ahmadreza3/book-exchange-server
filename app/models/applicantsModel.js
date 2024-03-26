const mongoose = require('mongoose')

const requestsSchema = new mongoose.Schema({
  requestId: {
    type: ObjectId,
    required: true
  },
  userName: String,
  description: { type: String, default: '' },
  time: String
})

const requestModel = mongoose.model('Request', requestsSchema)

module.exports = requestModel
