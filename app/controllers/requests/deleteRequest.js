const RequestsModel = require('../../models/requestsModel')
const ApplicantsModel = require('../../models/applicantsModel')
const AWS = require('../../services/AWS')

module.exports = async (req, res, next) => {
  try {
    const { requestId } = req.params
    const request = await RequestsModel.findByIdAndDelete(requestId)
    if (!request) {
      const applicant = await ApplicantsModel.findByIdAndDelete(requestId)
      if (!applicant) {
        return res.status(404).send({
          success: false,
          message: 'can not delete request',
          message_fa: 'نمی توان درخواست را حذف کرد'
        })
      }
    }
    if (request.awsKey.length > 0) {
      AWS.remove(request.awsKey)
    }
    await ApplicantsModel.deleteMany({ requestId: request._id })
    res.send({
      success: true,
      message: 'request deleted',
      message_fa: 'درخواست حذف شد'
    })
  } catch (error) {
    next(error)
  }
}
