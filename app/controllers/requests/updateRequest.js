const RequestsModel = require('../../models/requestsModel')
const ApplicantsModel = require('../../models/applicantsModel')

module.exports = async (req, res, next) => {
  try {
    const { requestId } = req.params
    const { n, nModified } = await RequestsModel.updateOne({ _id: requestId }, req.body)
    if (n === 0 || nModified === 0) {
      const { n, nModified } = await ApplicantsModel.updateOne({ _id: requestId }, req.body)
      if (n === 0 || nModified === 0) {
        return res.status(404).send({
          success: false,
          message: 'can not update request',
          message_fa: 'نمی توان درخواست را تغییر داد'
        })
      }
    }
    res.send({
      success: true,
      message: 'request updated',
      message_fa: 'درخواست به روز شد'
    })
  } catch (error) {
    next(error)
  }
}
