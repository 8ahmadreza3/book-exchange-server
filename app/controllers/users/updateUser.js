const UsersModel = require('../../models/usersModel')

module.exports = async (req, res, next) => {
  try {
    const { user } = req.data
    const { userName } = req.params
    if (user.userName !== userName && !user.isAdmin) {
      res.send({
        success: false,
        message: 'you are not authorized',
        message_fa: 'شما مجاز نیستید'
      })
    }
    const newUserName = req.body.userName.replaceAll(' ', '_')
    if (newUserName && newUserName !== userName) {
      const sameUserName = await UsersModel.findOne({ userName: newUserName })
      if (sameUserName) {
        res.send({
          success: false,
          message: 'This username is duplicate',
          message_fa: 'نام کاربری تکراری است'
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
    if (!user.isAdmin) {
      req.body.isAdmin = false
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
