const RequestsModel = require('../../models/requestsModel')
const dateService = require('../../services/dateService')

module.exports = async (req, res, next) => {
  const requests = await RequestsModel.find({})
  const presentedRequests = requests.map(request => {
    request.createdAt = dateService.toPersianDate(request.createdAt)
    console.log(request.createdAt)
    return request
  })
  res.send({
    message: 'success',
    data: {
      presentedRequests
    }
  })
}
