const RequestsModel = require('../../models/requestsModel')
const ApplicantsModel = require('../../models/applicantsModel')
const dateService = require('../../services/dateService')

module.exports = async (req, res, next) => {
  try {
    const requests = await RequestsModel.find({})
    const applicants = await ApplicantsModel.find({})
    const presentedRequests = requests.map(request => {
      request.createdAt = dateService.toPersianDate(request.createdAt)
      request.applicants = applicants.filter(applicant => {
        return applicant.requestId === request._id.toString()
      })
      return request
    })
    res.send({
      success: true,
      message: 'all the requests found',
      message_fa: 'تمام درخواست ها پیدا شد',
      data: {
        requests: presentedRequests
      }
    })
  } catch (error) {
    next(error)
  }
}
