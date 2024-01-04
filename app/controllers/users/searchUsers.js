const UserModel = require('../../models/usersModel')

module.exports = async (req, res, next) => {
  try {
    const search = req.query
    const users = await UserModel.find(search)
    res.send({
      success: true,
      message: 'users founded',
      date: {
        users
      }
    })
  } catch (error) {
    next(error)
  }
}
