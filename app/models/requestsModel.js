const mongoose = require('mongoose')

const status = ['درانتظار تائید', 'امانت داده شده', 'پس گرفته شده', 'در حال نمایش']
const requestsSchema = new mongoose.Schema({
  owner: String,
  book: String,
  createdAt: Date,
  applicants: Array,
  getter: String,
  time: String,
  conditions: String,
  description: String,
  status: { type: String, enum: status }
})

const requestModel = mongoose.model('Request', requestsSchema)

module.exports = requestModel
