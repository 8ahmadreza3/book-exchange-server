const UserModel = require('../../models/usersModel')

module.exports = async (req, res, next) => {
  try {
    const filter = req.body ? req.body : {}
    const users = await UserModel.find(filter)
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
