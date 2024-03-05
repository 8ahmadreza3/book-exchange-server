const mongoose = require('mongoose')

const status = ['درانتظار تائید', 'امانت داده شده', 'پس گرفته شده', 'در حال نمایش']
const requestsSchema = new mongoose.Schema({
  owner: String,
  book: String,
  state: String,
  city: String,
  phone: String,
  img: { type: String, default: '' },
  printYear: Number,
  publisher: String,
  conditions: { type: String, default: '' },
  createdAt: Date,
  applicants: [{
    userName: String,
    description: { type: String, default: '' },
    time: String
  }],
  getter: { type: String, default: '' },
  time: { type: String, default: '' },
  description: { type: String, default: '' },
  status: { type: String, enum: status },
  awsKey: { type: String, default: '' }
})

const requestModel = mongoose.model('Request', requestsSchema)

module.exports = requestModel
