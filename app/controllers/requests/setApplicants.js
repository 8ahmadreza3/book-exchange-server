const ApplicantsModel = require('../../models/applicantsModel')
const RequestsModel = require('../../models/requestsModel')

module.exports = async (requestId) => {
  const applicants = await ApplicantsModel.find({ requestId })
  await RequestsModel.updateOne({_id: requestId}, {applicants})
}