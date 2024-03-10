const RequestModel = require('../../models/requestsModel')
const UsersModel = require('../../models/usersModel')
// const AWS = require('../../services/AWS')

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
    const upload = {
      url: '',
      awsKey: ''
    }
    // if (req.files.image) {
    //   upload = AWS.upload(req.files.image)
    //   if (!upload.success) {
    //     return res.send(upload)
    //   }
    // }
    let user = await UsersModel.findOne({ userName: owner })
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
      img: upload.url,
      awsKey: upload.awsKey,
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
