const RequestsModel = require('../../models/requestsModel')
const UsersModel = require('../../models/usersModel')
const AWS = require('../../services/AWS')

module.exports = async (req, res, next) => {
  try {
    const { requestId, userName } = req.body
    const request = await RequestsModel.findOne({ _id: requestId })
    const user = await UsersModel.findOne({ userName })
    if ((request.owner === userName && !request.getter) || user.isAdmin) {
      const request = await RequestsModel.findByIdAndDelete(requestId)
      if (request.awsKey.length > 0) {
        const remove = AWS.remove(request.awsKey)
        if (!remove.success) {
          return res.send(remove)
        }
      }
      return res.send({
        success: true,
        message: 'Request was removed by the owner of the book',
        message_fa: 'درخواست توسط صاحب کتاب حذف شد'
      })
    }
    if (request.applicants.filter(ap => ap.userName === userName).length > 0 || user.isAdmin) {
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
