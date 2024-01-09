const RequestsModel = require('../../models/requestsModel')

module.exports = async (req, res, next) => {
  const { requestId, userName } = req.body
  const request = await RequestsModel.find({ _id: requestId })
  if (request.owner === userName) {
    await RequestsModel.deleteOne({ _id: requestId })
    return res.send({
      success: true,
      message: 'Request was removed by the owner of the book',
      message_fa: 'درخواست توسط صاحب کتاب حذف شد'
    })
  }
  if (request.applicants.includes(userName)) {
    const newApplicants = request.applicants.filter((applicant) => {
      return applicant !== userName
    })
    await RequestsModel.updateOne({ _id: requestId }, { newApplicants })
    return res.send({
      success: true,
      message: 'Request was removed',
      message_fa: 'درخواست حذف شد'
    })
  }
  return res.send({
    success: false,
    message: 'You are not the owner of this request',
    message_fa: 'شما مالک این درخواست نیستید'
  })
}
