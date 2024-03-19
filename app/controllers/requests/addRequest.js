const RequestModel = require('../../models/requestsModel')
const UsersModel = require('../../models/usersModel')

module.exports = async (req, res, next) => {
  try {
    const { owner, book, conditions, printYear } = req.body
    if (!owner || !book) {
      res.send({
        success: false,
        message: 'Enter the information in full',
        message_fa: 'اطلاعات را به صورت کامل وارد کنید'
      })
    }
    let user = await UsersModel.findOne({ userName: owner })
    // TODO this is for test
    user = user || {
      state: '',
      city: '',
      phone: ''
    }
    const newRequest = new RequestModel({
      owner,
      book,
      printYear,
      state: user.state,
      city: user.city,
      phone: user.phone,
      createdAt: new Date(),
      applicants: [],
      conditions,
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
