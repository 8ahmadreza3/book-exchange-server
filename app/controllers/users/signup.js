const UserModel = require('../../models/usersModel')
const hashServices = require('../../services/dateService')

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
    const samePhone = UserModel.find({ phone })
    if (samePhone) {
      return res.send({
        success: false,
        message: 'try another phoneNumber',
        message_fa: 'این شماره موبایل قبلا ثبت شده است'
      })
    }
    const sameUserName = UserModel.find({ userName })
    if (sameUserName) {
      return res.send({
        success: false,
        message: 'try another userName',
        message_fa: 'لطفا نام کاربری دیگری انتخاب کنید'
      })
    }
    const hashPassword = hashServices.hashPassword(password)
    const newUser = new UserModel({
      Name,
      userName,
      phone,
      img: '',
      state,
      city,
      admin: false,
      password: hashPassword
    })
    await newUser.save()
    res.status(201).send({
      success: true,
      message: 'new User added',
      newUser
    })
  } catch (error) {
    next(error)
  }
}
