const UserModel = require('../../models/userModel')

module.exports = async (req, res, next) => {
  try {
    UserModel()
  } catch (error) {
    next(error)
  }
}
