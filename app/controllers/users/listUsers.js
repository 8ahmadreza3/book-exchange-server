const UserModel = require('../../models/usersModel')

module.exports = async (req, res, next) => {
  const users = await UserModel.find({}, { password: 0 })
  res.send({
    message: 'success',
    data: {
      users
    }
  })
}
