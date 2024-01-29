const RequestsModel = require('../../models/requestsModel')

module.exports = async (req, res, next) => {
  const { requestId, userName } = req.body
  const request = await RequestsModel.findOne({ _id: requestId })
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
  const newApplicants = request.applicants.filter((applicantor) => {
    return applicantor.userName !== userName
  })
  await RequestsModel.updateOne({ _id: requestId }, { getter: userName, applicants: newApplicants, time, description, status: 'امانت داده شده' })
  res.send({
    success: true,
    message: 'The request was confirmed',
    message_fa: 'درخواست تائید شد'
  })
}
