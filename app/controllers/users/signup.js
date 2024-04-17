const UsersModel = require('../../models/usersModel')
const hashServices = require('../../services/hashService')

module.exports = async (req, res, next) => {
  try {
    const { name, userName, awsKey, phone, state, city, password } = req.body
    if (!name || !userName || !phone || !password) {
      res.send({
        success: false,
        message: 'Enter the information in full',
        message_fa: 'اطلاعات را به صورت کامل وارد کنید'
      })
    }
    const same = await UsersModel.findOne({ $or: [{ phone }, { userName }] })
    if (same) {
      return res.send({
        success: false,
        message: 'try another phone number or username',
        message_fa: 'این شماره موبایل یا نام کاربری قبلا ثبت شده است'
      })
    }

    const hashPassword = hashServices.hashPassword(password)
    const img = awsKey ? process.env.LIARA_URL + awsKey + '.png' : ''
    const newUser = new UsersModel({
      name,
      userName: userName.replaceAll(' ', '_'),
      phone,
      state,
      city,
      isAdmin: false,
      password: hashPassword,
      img,
      awsKey: awsKey || ''
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
