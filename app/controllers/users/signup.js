const UsersModel = require('../../models/usersModel')
const hashServices = require('../../services/dateService')
// const AWS = require('../../services/AWS')

module.exports = async (req, res, next) => {
  try {
    const { name, userName, phone, state, city, password } = req.body
    if (!name || !userName) {
      res.send({
        success: false,
        message: 'Enter the information in full',
        message_fa: 'اطلاعات با به صورت کامل وارد کنید'
      })
    }
    const same = UsersModel.findOne({ $or: [{ phone, userName }] })
    if (same) {
      return res.send({
        success: false,
        message: 'try another phoneNumber',
        message_fa: 'این شماره موبایل یا نام کاربری قبلا ثبت شده است'
      })
    }
    // let upload
    // if (req.files.image) {
    //   upload = AWS.upload(req.files.image)
    //   if (!upload.success) {
    //     return res.send(upload)
    //   }
    // }

    const hashPassword = hashServices.hashPassword(password)
    const newUser = new UsersModel({
      name,
      userName: userName.replaceAll(' ', '_'),
      phone,
      state,
      city,
      isAdmin: false,
      password: hashPassword
      // image: upload.url || '',
      // awsKey: upload.awsKey || ''
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
