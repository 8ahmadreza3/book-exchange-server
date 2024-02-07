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
    const { n, nModified } = await UserModel.updateOne({ userName }, { ...req.body })
    if (n === 0 || nModified === 0) {
      return res.status(404).send({
        success: false,
        message: 'Can not update User',
        message_fa: 'نمی توان کاربر را به روز کرد'
      })
    }
    res.send({
      success: true,
      message: 'User information has been updated',
      message_fa: 'اطلاعات کاربر به روز شده است'
    })
  } catch (error) {
    next(error)
  }
}
