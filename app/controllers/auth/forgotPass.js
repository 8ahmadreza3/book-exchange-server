const smsService = require('../../services/smsService')
const UserModel = require('../../models/usersModel')

module.exports = async (req, res, next) => {
  try {
    const { userAuth } = req.body
    const user = await UserModel.findOne({ $or: [{ userName: userAuth }, { phone: userAuth }] })
    if (!user) {
      return res.send({
        success: false,
        message: 'user phone not found',
        message_fa: 'شماره کاربر یافت نشد'
      })
    }
    const authCode = Math.floor(Math.random() * 90000 + 10000)
    smsService(user.phone, authCode)
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