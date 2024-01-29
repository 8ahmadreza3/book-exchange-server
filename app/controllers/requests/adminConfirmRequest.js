const RequestsModel = require('../../models/requestsModel')
const UsersModel = require('../../models/usersModel')

module.exports = async (req, res, next) => {
  try {
    const { requestId, userName } = req.body
    const request = await RequestsModel.findOne({ _id: requestId })
    const user = await UsersModel.findOne({ userName })
    if (request && user.isAdmin) {
      await RequestsModel.updateOne({ _id: requestId }, { status: 'در حال نمایش' })
      return res.send({
        success: true,
        message: 'The request was confirmed by admin',
        message_fa: 'تائید شد'
      })
    }
    return res.send({
      success: false,
      message: 'The request was not confirmed',
      message_fa: 'درخواست تائید نشد'
    })
  } catch (error) {
    next(error)
  }
}
