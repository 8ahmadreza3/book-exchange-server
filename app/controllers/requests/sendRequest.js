const RequestsModel = require('../../models/requestsModel')
const ApplicantsModel = require('../../models/applicantsModel')

module.exports = async (req, res, next) => {
  try {
    const { requestId, userName, time, description } = req.body
    const request = await RequestsModel.findById(requestId)
    if (!request) {
      return res.send({
        success: false,
        message: 'There is no such request with this ID',
        message_fa: 'چنین درخواستی با این آیدی وجود ندارد'
      })
    }
    const newApplicant = new ApplicantsModel({
      requestId,
      userName,
      time,
      description
    })
    await newApplicant.save()
    res.status(201).send({
      success: true,
      message: 'request sended',
      message_fa: 'درخواست ارسال شد'
    })
  } catch (error) {
    next(error)
  }
}
