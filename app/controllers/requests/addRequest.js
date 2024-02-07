const RequestModel = require('../../models/requestsModel')

module.exports = async (req, res, next) => {
  try {
    const {
      owner,
      book,
      conditions,
      printYear
    } = req.body
    const newRequest = new RequestModel({
      owner,
      book,
      printYear,
      createdAt: new Date(),
      applicants: [],
      conditions,
      description: '',
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
