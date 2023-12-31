const RequestModel = require('../../models/requestsModel')

module.exports = async (req, res, next) => {
  try {
    const {
      owner,
      book,
      conditions
    } = req.body
    const newRequest = new RequestModel({
      owner,
      book,
      requests: '',
      getter: '',
      time: '',
      conditions,
      description: ''
    })
    await newRequest.save()
    res.status(201).send({
      success: true,
      message: 'new category added',
      newRequest
    })
  } catch (error) {
    next(error)
  }
}
