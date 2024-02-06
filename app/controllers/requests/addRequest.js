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
      getter: '',
      time: 0,
      conditions,
      description: '',
      status: 'درانتظار تائید'
    })
    await newRequest.save()
    res.status(201).send({
      success: true,
      message: 'new request added',
      newRequest
    })
  } catch (error) {
    next(error)
  }
}
