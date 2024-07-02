const RequestsModel = require('../../models/requestsModel')
const ApplicantsModel = require('../../models/applicantsModel')
const dateService = require('../../services/dateService')

module.exports = async (req, res, next) => {
  try {
    let requests = await RequestsModel.find({})
    requests = requests.map(request => {
      request.createdAt = dateService.toPersianDate(request.createdAt)
      return request
    })
    res.send({
      success: true,
      message: 'all the requests found',
      message_fa: 'تمام درخواست ها پیدا شد',
      data: {
        requests
      }
    })
  } catch (error) {
    next(error)
  }
}
