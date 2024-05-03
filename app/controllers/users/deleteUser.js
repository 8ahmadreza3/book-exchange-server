const UsersModel = require('../../models/usersModel')
const AWS = require('../../services/AWS')

module.exports = async (req, res, next) => {
  try {
    const { userName } = req.params
    if (!userName) {
      return res.status(404).send({
        success: false,
        message: 'Invalid User',
        message_fa: 'کاربر نامعتبر'
      })
    }
    const user = await UsersModel.findOneAndDelete({ userName })
    if (user) {
      return res.send({
        success: false,
        message: 'user not found',
        message_fa: 'کاربر پیدا نشد'
      })
    }
    if (user.awsKey.length > 0) {
      AWS.remove(user.awsKey)
    }

    res.send({
      success: true,
      message: 'User deleted',
      message_fa: 'کاربر حذف شد'
    })
  } catch (error) {
    next(error)
  }
}
