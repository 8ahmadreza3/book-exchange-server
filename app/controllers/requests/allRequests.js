const RequestsModel = require('../../models/requestsModel')
const ApplicantsModel = require('../../models/applicantsModel')
const dateService = require('../../services/dateService')

module.exports = async (req, res, next) => {
  try {
    const requests = await RequestsModel.find({})
    const presentedRequests = requests.map(async request => {
      request.createdAt = dateService.toPersianDate(request.createdAt)
      request.applicants = await ApplicantsModel.find({ requestId: request._id })
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
