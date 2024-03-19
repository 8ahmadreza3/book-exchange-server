const RequestsModel = require('../../models/requestsModel')
const dateService = require('../../services/dateService')

module.exports = async (req, res, next) => {
  try {
    const { userName } = req.param
    if (!userName) {
      return res.status(401).send({
        success: false,
        message: 'Invalid user',
        message_fa: 'کاربر نامعتبر'
      })
    }
    const requestsOwner = await RequestsModel.find({ owner: userName })
    const requestsGetter = await RequestsModel.find({ getter: userName })
    const owner = requestsOwner.map(request => {
      request.createdAt = dateService.toPersianDate(request.createdAt)
      return request
    })
    const getter = requestsGetter.map(request => {
      request.createdAt = dateService.toPersianDate(request.createdAt)
      return request
    })
    res.send({
      success: true,
      message: 'This user\'s requests were found',
      message_fa: 'درخواست های این کاربر پیدا شد',
      data: {
        getter,
        owner
      }
    })
  } catch (error) {
    next(error)
  }
}
