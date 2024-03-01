const mongoose = require('mongoose')

const status = ['درانتظار تائید', 'امانت داده شده', 'پس گرفته شده', 'در حال نمایش']
const requestsSchema = new mongoose.Schema({
  owner: String,
  book: String,
  state: String,
  city: String,
  phone: String,
  img: String,
  printYear: Number,
  publisher: String,
  conditions: String,
  createdAt: Date,
  applicants: [{
    userName: String,
    description: String,
    time: String
  }],
  getter: String,
  time: String,
  description: String,
  status: { type: String, enum: status },
  awsKey: String
})

const requestModel = mongoose.model('Request', requestsSchema)

module.exports = requestModel
