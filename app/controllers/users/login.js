const UserModel = require('../../models/usersModel')
const tokenService = require('../../services/tokenService')
const hashService = require('../../services/hashService')
const smsService = require('../../services/smsService')

module.exports = async (req, res, next) => {
  try {
    const { userName, password, phone } = req.body
    let smsCode = -1
    const user = await UserModel.findOne({ $or: [{ userName }, { phone }] })
    if (!user) {
      return res.status(404).send({
        status: 404,
        message: 'not found user',
        message_fa: 'چنین کاربری یافت نشد'
      })
    }
    if (!phone) {
      if (hashService.comparePassword(password, user.password)) {
        return res.render({
          error: true,
          message: 'can not login'
        })
      }
    }
    if (!userName) {
      smsCode = smsService.send(phone)
    }
    const token = tokenService.sign({ id: user._id })
    res.send({
      status: 200,
      message: '',
      token,
      smsCode
    })
  } catch (error) {
    next(error)
  }
}
