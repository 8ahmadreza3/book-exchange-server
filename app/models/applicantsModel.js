const mongoose = require('mongoose')

const applicantsSchema = new mongoose.Schema({
  requestId: Schema.Types.ObjectId,
  userName: String,
  description: { type: String, default: '' },
  time: String
})

const applicantsModel = mongoose.model('Applicants', applicantsSchema)

module.exports = applicantsModel
