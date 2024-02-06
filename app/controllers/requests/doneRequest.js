const RequestsModel = require('../../models/requestsModel')

module.exports = async (req, res, next) => {
  try {
    const { requestId, userName } = req.body
    const request = await RequestsModel.findOne({ _id: requestId })
    if (request && userName === request.owner && request.getter) {
      await RequestsModel.updateOne({ _id: requestId }, { status: 'پس گرفته شده' })
      return res.send({
        success: true,
        message: 'The status is done',
        message_fa: 'تائید شد'
      })
    }
    res.send({
      success: false,
      message: 'The request was not confirmed',
      message_fa: 'درخواست تائید نشد'
    })
  } catch (error) {
    next(error)
  }
}
