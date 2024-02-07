const UserModel = require('../../models/usersModel')

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
    const { deletedCount } = await UserModel.deleteOne({ userName })
    if (deletedCount === 0) {
      return res.send({
        success: false,
        message: 'user not found',
        message_fa: 'کاربر پیدا نشد'
      })
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
