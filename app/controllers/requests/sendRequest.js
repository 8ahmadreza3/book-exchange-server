const RequestModel = require('../../models/requestsModel')

module.exports = async (req, res, next) => {
  try {
    const { id } = req.param
    const {
      userName,
      time,
      description
    } = req.body
    const newRequest = { userName, time, description }
    const pre = await RequestModel.find({ _id: id })
    const { n, nModified } = await RequestModel.update({ _id: id }, {
      requests: [...pre.requests, ...newRequest]
    })
    if (n === 0 || nModified === 0) {
      return res.status(404).send({
        error: true,
        message: 'can not send request'
      })
    }
    res.status(201).send({
      success: true,
      message: 'request sended'
    })
  } catch (error) {
    next(error)
  }
}
