const RequestsModel = require('../../models/requestsModel')

module.exports = async (req, res, next) => {
  try {
    const { requestId, userName, time, description } = req.body
    const newApplicantor = [{ userName, time, description }]
    const pre = await RequestsModel.findOne({ _id: requestId }, { _id: 0 })
    const newApplicants = [...pre.applicants, ...newApplicantor]
    const { n, nModified } = await RequestsModel.updateOne({ _id: requestId }, { applicants: newApplicants })
    if (n === 0 || nModified === 0) {
      return res.status(404).send({
        success: false,
        message: 'can not send request',
        message_fa: 'نمی توان درخواست ارسال کند'
      })
    }
    res.status(201).send({
      success: true,
      message: 'request sended',
      message_fa: 'درخواست ارسال شد'
    })
  } catch (error) {
    next(error)
  }
}
