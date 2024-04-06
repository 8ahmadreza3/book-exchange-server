const jwt = require('../../services/tokenService')
const UserModel = require('../../models/usersModel')

module.exports = async (req, res, next) => {
  try {
    const { token } = req.params
    if (!jwt.verify(token)) {
      return res.status(401).send({
        success: false,
        message: 'your token is not valid',
        message_fa: 'توکن شما معتبر نیست'
      })
    }
    const { userName, phone, _id } = jwt.decode(token)
    const user = await UserModel.findOne({ userName, phone, _id })
    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'User does not exist!',
        message_fa: 'کاربر یافت نشد'
      })
    }
    res.send({
      success: true,
      message: 'user founded',
      message_fa: 'کاربر یافت شد',
      data: {
        user
      }
    })
  } catch (error) {
    next(error)
  }
}
