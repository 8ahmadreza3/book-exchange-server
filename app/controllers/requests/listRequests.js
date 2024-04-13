const RequestsModel = require('../../models/requestsModel')
const dateService = require('../../services/dateService')
const ApplicantsModel = require('../../models/applicantsModel')

module.exports = async (req, res, next) => {
  try {
    const { userName } = req.params
    if (!userName) {
      return res.status(401).send({
        success: false,
        message: 'Invalid user',
        message_fa: 'کاربر نامعتبر'
      })
    }
    const allRequests = await RequestsModel.find({})
    const allApplicants = await ApplicantsModel.find({})

    const requestsOwner = allRequests.filter(request => {
      request.createdAt = dateService.toPersianDate(request.createdAt)
      return request.owner === userName
    })
    const requestsGetter = allRequests.filter(request => {
      return request.getter === userName
    })
    const owner = requestsOwner.map(request => {
      request.applicants = allApplicants.filter(applicant => {
        return applicant.requestId === request._id.toString()
      })
      return request
    })
    const applicants = allApplicants.map(applicant => {
      const request = allRequests.find(request => {
        return request._id.toString() === applicant.requestId && applicant.userName === userName
      })
      request.applicants = [applicant]
      return request
    })
    res.send({
      success: true,
      message: 'This user\'s requests were found',
      message_fa: 'درخواست های این کاربر پیدا شد',
      data: {
        getter: requestsGetter,
        owner,
        applicants
      }
    })
  } catch (error) {
    next(error)
  }
}
