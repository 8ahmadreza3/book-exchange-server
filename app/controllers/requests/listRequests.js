const RequestsModel = require('../../models/requestsModel')

module.exports = async (req, res, next) => {
  const requests = await RequestsModel.find({})
  res.send({
    message: 'success',
    data: {
      requests
    }
  })
}
