const smsService = require('../../services/smsService')
const UsersModel = require('../../models/usersModel')

module.exports = async (req, res, next) => {
  try {
    const { phone } = req.params
    const user = UsersModel.findOne({ phone })
    if (user) {
      return res.send({
        success: false,
        message: 'try another phone number ',
        message_fa: 'این شماره ثبت شده شماره دیگری را امتحان کنید'
      })
    }
    const authCode = Math.floor(Math.random() * 90000 + 10000)
    smsService(phone, authCode)
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
