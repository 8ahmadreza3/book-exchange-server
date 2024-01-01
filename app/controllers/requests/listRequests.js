const RequestsModel = require('../../models/requestsModel')
const dateService = require('../../services/dateService')
module.exports = async (req, res, next) => {
  const { userName } = req.param
  if (!userName) {
    return res.status(401).send({
      error: 'Invalid user'
    })
  }
  const requests = await RequestsModel.find({ owner: userName })
  const presentedRequests = requests.map(request => {
    request.createdAt_persian = dateService.toPersianDate(request.createdAt)
    return request
  })
  res.send({
    message: 'success',
    data: {
      presentedRequests
    }
  })
}
