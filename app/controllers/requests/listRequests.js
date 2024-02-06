const RequestsModel = require('../../models/requestsModel')
const dateService = require('../../services/dateService')

module.exports = async (req, res, next) => {
  const { userName } = req.param
  if (!userName) {
    return res.status(401).send({
      error: 'Invalid user'
    })
  }
  const requestsOwner = await RequestsModel.find({ owner: userName })
  const requestsGetter = await RequestsModel.find({ getter: userName })
  const owner = requestsOwner.map(request => {
    request.createdAt_persian = dateService.toPersianDate(request.createdAt)
    return request
  })
  const getter = requestsGetter.map(request => {
    request.createdAt_persian = dateService.toPersianDate(request.createdAt)
    return request
  })
  res.send({
    success: true,
    message: '',
    message_fa: '',
    data: {
      getter,
      owner
    }
  })
}
