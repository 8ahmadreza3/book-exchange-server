const UsersModel = require('../../models/usersModel')
// const AWS = require('../../services/AWS')

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
    // const { awsKey } = await UsersModel.findOne({ userName })
    const { deletedCount } = await UsersModel.deleteOne({ userName })
    if (deletedCount === 0) {
      return res.send({
        success: false,
        message: 'user not found',
        message_fa: 'کاربر پیدا نشد'
      })
    }

    // const remove = AWS.remove(awsKey)
    // if (!remove.success) {
    //   return res.send(remove)
    // }

    res.send({
      success: true,
      message: 'User deleted',
      message_fa: 'کاربر حذف شد'
    })
  } catch (error) {
    next(error)
  }
}
