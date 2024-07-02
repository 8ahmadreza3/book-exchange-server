const RequestsModel = require('../../models/requestsModel')
const dateService = require('../../services/dateService')
const ApplicantsModel = require('../../models/applicantsModel')

module.exports = async (req, res, next) => {
  try {
    const userName = req.params.userName.replaceAll(' ', '_').toLowerCase()
    const { user } = req.data
    if (!user.isAdmin && userName !== user.userName) {
      res.send({
        success: false,
        message: 'You do not have the required access',
        message_fa: 'شما دسترسی لازم را ندارید'
      })
    }
    if (!userName) {
      return res.status(401).send({
        success: false,
        message: 'Invalid user',
        message_fa: 'کاربر نامعتبر'
      })
    }
    let getter = await RequestsModel.find({getter: userName})
    getter = getter.map((request) => {
      request.createdAt = dateService.toPersianDate(request.createdAt)
      return request
    })
    let owner = await RequestsModel.find({owner: userName})
    owner = owner.map((request) => {
      request.createdAt = dateService.toPersianDate(request.createdAt)
      return request
    })
    let applicants = await ApplicantsModel.find({userName})
    applicants = applicants.map(async (applicant) => {
      const request = await RequestsModel.findById(applicant.requestId)
      request.createdAt = dateService.toPersianDate(request.createdAt)
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
