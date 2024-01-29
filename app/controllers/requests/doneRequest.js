const RequestsModel = require('../../models/requestsModel')
const UsersModel = require('../../models/usersModel')

module.exports = async (req, res, next) => {
  const { requestId, userName } = req.body
  const request = await RequestsModel.findOne({ _id: requestId })
  const user = await UsersModel.findOne({ userName })
  if (request && user.userName === request.owner && request.getter) {
    await RequestsModel.updateOne({ _id: requestId }, { status: 'پس گرفته شده' })
    return res.send({
      success: true,
      message: 'The status is done',
      message_fa: 'تائید شد'
    })
  }
  res.send({
    success: false,
    message: 'The request was not confirmed',
    message_fa: 'درخواست تائید نشد'
  })
}
