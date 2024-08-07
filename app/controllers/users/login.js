const UserModel = require('../../models/usersModel')
const tokenService = require('../../services/tokenService')
const hashService = require('../../services/hashService')

module.exports = async (req, res, next) => {
  try {
    const { password } = req.body
    const userAuth = req.body.userAuth.replaceAll(' ', '_').toLowerCase()
    const user = await UserModel.findOne({ $or: [{ userName: userAuth }, { phone: userAuth }] })
    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'not found user',
        message_fa: 'کاربر یافت نشد'
      })
    }
    if (!hashService.comparePassword(password, user.password)) {
      return res.send({
        success: false,
        message: 'The password or username/number is incorrect',
        message_fa: 'رمز یا نام کاربری/شماره اشتباه است'
      })
    }
    const token = tokenService.sign({ userName: user.userName, phone: user.phone, _id: user._id })
    res.send({
      success: true,
      message: 'Login was successful',
      message_fa: 'ورود با موفقیت انجام شد',
      data: {
        token,
        user
      }
    })
  } catch (error) {
    next(error)
  }
}
