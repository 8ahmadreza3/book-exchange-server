const RequestsModel = require('../../models/requestsModel')

module.exports = async (req, res, next) => {
  try {
    const { _id, userName } = req.body
    const request = await RequestsModel.findOne({ _id })
    const { applicantor, time, description } = request.applicants.find((applicantor) => {
      return applicantor.userName === userName
    })
    if (!request || !applicantor) {
      return res.send({
        success: false,
        message: 'The request was not confirmed',
        message_fa: 'درخواست تائید نشد'
      })
    }
    await RequestsModel.updateOne({ _id }, { getter: userName, createdAt: new Date(), time, description, status: 'امانت داده شده' })
    res.send({
      success: true,
      message: 'The request was confirmed',
      message_fa: 'درخواست تائید شد'
    })
  } catch (error) {
    next(error)
  }
}
