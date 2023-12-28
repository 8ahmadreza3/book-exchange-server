const UserModel = require('../../models/userModel')

module.exports = async (req, res, next) => {
  const users = await UserModel.find({})
  res.send({
    message: 'success',
    data: {
      users
    }
  })
}
