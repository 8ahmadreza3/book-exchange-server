const RequestsModel = require('../../models/requestsModel')

module.exports = async (req, res, next) => {
  try {
    const { requestId } = req.params
    const { n, nModified } = await RequestsModel.updateOne({ _id: requestId }, { status: 'در حال نمایش' })
    if (n === 0 || nModified === 0) {
      return res.send({
        success: false,
        message: 'The request was not confirmed',
        message_fa: 'درخواست تائید نشد'
      })
    }
    res.send({
      success: true,
      message: 'The request was confirmed by admin',
      message_fa: 'درخواست توسط ادمین تایید شد'
    })
  } catch (error) {
    next(error)
  }
}
