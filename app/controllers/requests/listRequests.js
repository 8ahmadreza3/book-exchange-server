const RequestsModel = require('../../models/requestsModel')
const dateService = require('../../services/dateService')
const ApplicantsModel = require('../../models/applicantsModel')

module.exports = async (req, res, next) => {
  try {
    const { userName } = req.param
    if (!userName) {
      return res.status(401).send({
        success: false,
        message: 'Invalid user',
        message_fa: 'کاربر نامعتبر'
      })
    }
    const requestsOwner = await RequestsModel.find({ owner: userName })
    const requestsGetter = await RequestsModel.find({ getter: userName })
    const requestsApplicant = await ApplicantsModel.find({ userName })
    const owner = requestsOwner.map(async request => {
      request.createdAt = dateService.toPersianDate(request.createdAt)
      request.applicants = await ApplicantsModel.find({ requestId: request.id })
      return request
    })
    const getter = requestsGetter.map(request => {
      request.createdAt = dateService.toPersianDate(request.createdAt)
      return request
    })
    const applicants = requestsApplicant.map(async applicant => {
      const request = await RequestsModel.findOne({ _id: applicants.requestId })
      request.createdAt = dateService.toPersianDate(request.createdAt)
      request.applicants = [applicant]
      return request
    })
    res.send({
      success: true,
      message: 'This user\'s requests were found',
      message_fa: 'درخواست های این کاربر پیدا شد',
      data: {
        getter,
        owner,
        applicants
      }
    })
  } catch (error) {
    next(error)
  }
}
