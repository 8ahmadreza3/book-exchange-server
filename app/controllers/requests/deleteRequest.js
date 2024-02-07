const RequestsModel = require('../../models/requestsModel')

module.exports = async (req, res, next) => {
  try {
    const { requestId, userName } = req.body
    const request = await RequestsModel.findOne({ _id: requestId })
    if (request.owner === userName && !request.getter) {
      await RequestsModel.deleteOne({ _id: requestId })
      return res.send({
        success: true,
        message: 'Request was removed by the owner of the book',
        message_fa: 'درخواست توسط صاحب کتاب حذف شد'
      })
    }
    if (request.applicants.filter(ap => ap.userName === userName).length > 0) {
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
      message: 'You can not the delete this request',
      message_fa: 'شما نمی توانید این درخواست را حذف کنید'
    })
  } catch (error) {
    next(error)
  }
}
