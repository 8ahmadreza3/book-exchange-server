const RequestsModel = require('../../models/requestsModel')

module.exports = async (req, res, next) => {
  const { userName } = req.param
  if (!userName) {
    return res.status(401).send({
      error: 'Invalid user'
    })
  }
  const requests = await RequestsModel.find({ owner: userName })
  res.send({
    message: 'success',
    data: {
      requests
    }
  })
}
