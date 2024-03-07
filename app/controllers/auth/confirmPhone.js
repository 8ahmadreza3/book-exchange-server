const smsService = require('../../services/smsService')

module.exports = async (req, res, next) => {
  try {
    const { phone } = req.params
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