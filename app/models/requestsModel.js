const mongoose = require('mongoose')

const status = ['درانتظار تائید', 'امانت داده شده', 'پس گرفته شده', 'در حال نمایش']
const requestsSchema = new mongoose.Schema({
  owner: String,
  book: String,
  state: String,
  city: String,
  phone: String,
  printYear: String,
  publisher: String,
  conditions: { type: String, default: '' },
  createdAt: Date,
  getter: { type: String, default: '' },
  time: { type: String, default: '' },
  description: { type: String, default: '' },
  status: { type: String, enum: status },
  applicants: [],
  img: String,
  awsKey: String
})

const requestModel = mongoose.model('Request', requestsSchema)

module.exports = requestModel
