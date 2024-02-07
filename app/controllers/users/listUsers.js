const UserModel = require('../../models/usersModel')

module.exports = async (req, res, next) => {
  try {
    const users = await UserModel.find(req.body, { password: 0 })
    res.send({
      success: true,
      message: 'users  found',
      message_fa: 'کاربران پیدا شدند',
      data: {
        users
      }
    })
  } catch (error) {
    next(error)
  }
}
