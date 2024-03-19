const RequestsModel = require('../../models/requestsModel')
const dateService = require('../../services/dateService')

module.exports = async (req, res, next) => {
  try {
    const filter = req.body ? req.body : {}
    const requests = await RequestsModel.find(filter)
    const presentedRequests = requests.map(request => {
      request.createdAt = dateService.toPersianDate(request.createdAt)
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
