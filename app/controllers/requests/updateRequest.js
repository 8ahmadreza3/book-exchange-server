const RequestsModel = require('../../models/requestsModel')
const userModel = require('../../models/usersModel')

module.exports = async (req, res, next) => {
  try {
    const { requestId, userName } = req.body
    const user = await userModel.findOne({ userName })
    const request = await RequestsModel.findOne({ _id: requestId })
    if (user.isAdmin || (userName === request.owner && !request.getter)) {
      const { n, nModified } = await RequestsModel.updateOne({ _id: requestId }, req.body)
      if (n === 0 || nModified === 0) {
        return res.status(404).send({
          success: false,
          message: 'can not update request',
          message_fa: 'نمی توان درخواست را تغییر داد'
        })
      }
      return res.send({
        success: true,
        message: 'request updated',
        message_fa: 'درخواست به روز شد'
      })
    }
    res.send({
      success: false,
      message: 'you don\'t have this permission',
      message_fa: 'شما مجوز این کار را ندارید'
    })
  } catch (error) {
    next(error)
  }
}
