const smsService = require('../../services/smsService')
const UsersModel = require('../../models/usersModel')

module.exports = async (req, res, next) => {
  try {
    const { phone } = req.params
    const user = await UsersModel.findOne({ phone })
    
    if (user) {
      return res.send({
        success: false,
        message: 'try another phone number',
        message_fa: 'این شماره ثبت شده شماره دیگری را امتحان کنید'
      })
    }
    const { authCode } = smsService(phone, process.env.SMS_LOGIN_ID)
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
