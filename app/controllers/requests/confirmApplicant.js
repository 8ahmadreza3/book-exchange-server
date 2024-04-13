const RequestsModel = require('../../models/requestsModel')
const ApplicantsModel = require('../../models/applicantsModel')

module.exports = async (req, res, next) => {
  try {
    const { applicantId } = req.params
    if (!applicantId) {
      return res.send({
        success: false,
        message: 'Not Found requestId or applicantId',
        message_fa: 'مشخصات امانت دهنده یا امانت گیرنده یافت نشد'
      })
    }
    const { requestId, userName, time, description } = await ApplicantsModel.findById(applicantId)
    if (!userName || !requestId) {
      return res.send({
        success: false,
        message: 'The request was not confirmed',
        message_fa: 'درخواست تائید نشد'
      })
    }
    const request = await RequestsModel.findById(requestId)
    if (request.getter) {
      return res.send({
        success: false,
        message: 'This request have a getter',
        message_fa: 'این درخواست گیرنده دارد و نمی توان گیرنده دیگری اضافه کرد'
      })
    }
    await RequestsModel.updateOne({ _id: requestId }, { getter: userName, createdAt: new Date(), time, description, status: 'امانت داده شده' })
    await ApplicantsModel.deleteOne({ _id: applicantId })
    res.send({
      success: true,
      message: 'The request was confirmed',
      message_fa: 'درخواست تائید شد'
    })
  } catch (error) {
    next(error)
  }
}
