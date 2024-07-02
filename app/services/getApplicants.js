const ApplicantsModel = require('../../models/applicantsModel')

module.exports = async (requestId) => {
  const applicants = await ApplicantsModel.find({ requestId })
  return applicants
}