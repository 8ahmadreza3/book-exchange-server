const UserModel = require('../../models/usersModel')
const hashServices = require('../../services/dateService')
// const AWS = require('../../services/AWS')

module.exports = async (req, res, next) => {
  try {
    const {
      Name,
      userName,
      phone,
      state,
      city,
      password
    } = req.body
    const samePhone = UserModel.findOne({ phone })
    if (samePhone) {
      return res.send({
        success: false,
        message: 'try another phoneNumber',
        message_fa: 'این شماره موبایل قبلا ثبت شده است'
      })
    }
    const sameUserName = UserModel.findOne({ userName })
    if (sameUserName) {
      return res.send({
        success: false,
        message: 'try another userName',
        message_fa: 'لطفا نام کاربری دیگری انتخاب کنید'
      })
    }

    // TODO
    // const upload = AWS.upload(req.files.image)
    // if (!upload.success) {
    //   return res.send(upload)
    // }

    const hashPassword = hashServices.hashPassword(password)
    const newUser = new UserModel({
      Name,
      userName,
      phone,
      state,
      city,
      isAdmin: false,
      password: hashPassword
    })
    await newUser.save()
    res.status(201).send({
      success: true,
      message: 'new User added',
      message_fa: 'کاربر جدید اضافه شد'
    })
  } catch (error) {
    next(error)
  }
}
