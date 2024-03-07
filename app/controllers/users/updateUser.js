const UsersModel = require('../../models/usersModel')

module.exports = async (req, res, next) => {
  try {
    const { userName } = req.params
    const newUserName = req.body.userName
    if (newUserName && newUserName !== userName) {
      req.body.userName = newUserName.replaceAll(' ', '_')
      const sameUserName = await UsersModel.findOne({ userName: newUserName })
      if (sameUserName) {
        res.send({
          success: false,
          message: 'This address is duplicate',
          message_fa: 'این آدرس تکراری است'
        })
      }
    }
    if (!userName) {
      return res.status(404).send({
        success: false,
        message: 'Invalid User',
        message_fa: 'کاربر نامعتبر'
      })
    }
    const { n, nModified } = await UsersModel.updateOne({ userName }, { ...req.body })
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
