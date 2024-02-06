const RequestsModel = require('../../models/requestsModel')

module.exports = async (req, res, next) => {
  try {
    const { requestId } = req.body
    const request = await RequestsModel.findOne({ _id: requestId })
    if (request) {
      return res.send({
        success: false,
        message: 'The request was not confirmed',
        message_fa: 'درخواست تائید نشد'
      })
    }
    await RequestsModel.updateOne({ _id: requestId }, { status: 'در حال نمایش' })
    res.send({
      success: true,
      message: 'The request was confirmed by admin',
      message_fa: 'درخواست توسط ادمین تایید شد'
    })
  } catch (error) {
    next(error)
  }
}
