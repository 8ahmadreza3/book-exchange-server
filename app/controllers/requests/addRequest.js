const RequestModel = require('../../models/requestsModel')
const UsersModel = require('../../models/usersModel')
const aws = require('../../services/AWS')

module.exports = async (req, res, next) => {
  try {
    const { owner, book, awsKey, conditions, printYear, publisher } = req.body
    if (!owner || !book) {
      res.send({
        success: false,
        message: 'Enter the information in full',
        message_fa: 'اطلاعات را به صورت کامل وارد کنید'
      })
    }
    const user = await UsersModel.findOne({ userName: owner })
    if (!user) {
      return res.send({
        success: false,
        message: 'user dosn\'t exist',
        message_fa: 'کاربر یافت نشد'
      })
    }
    const img = awsKey ? aws.publicUrl(awsKey) : ''
    const newRequest = new RequestModel({
      owner,
      book,
      printYear,
      publisher,
      state: user.state,
      city: user.city,
      phone: user.phone,
      createdAt: new Date(),
      applicants: [],
      conditions,
      img,
      awsKey: awsKey || '',
      status: 'درانتظار تائید'
    })
    await newRequest.save()
    res.status(201).send({
      success: true,
      message: 'Book loan request was registered',
      message_fa: 'درخواست امانت کتاب ثبت شد'
    })
  } catch (error) {
    next(error)
  }
}
