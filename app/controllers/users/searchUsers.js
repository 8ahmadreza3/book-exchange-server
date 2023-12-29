const UserModel = require('../../models/usersModel')

module.exports = async (req, res, next) => {
  try {
    UserModel()
  } catch (error) {
    next(error)
  }
}
