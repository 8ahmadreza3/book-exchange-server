const smsService = require('../../services/smsService')
const UsersModel = require('../../models/usersModel')

module.exports = async (req, res, next) => {
  try {
    const { userAuth } = req.params
    const user = await UsersModel.findOne({ $or: [{ userName: userAuth }, { phone: userAuth }] })
    if (!user) {
      return res.send({
        success: false,
        message: 'user phone not found',
        message_fa: 'شماره کاربر یافت نشد'
      })
    }
    const { authCode } = smsService(user.phone, process.env.SMS_FORGOT_ID)
    if (!authCode) {
      res.send({
        success: false,
        message: 'There was an error sending',
        message_fa: 'خطایی در ارسال رخ داد'
      })
    }
    res.send({
      success: true,
      message: 'Authentication code sent',
      message_fa: 'کد احراز هویت ارسال شد',
      data: {
        authCode
      }
    })
  } catch (error) {
    next(error)
  }
}
