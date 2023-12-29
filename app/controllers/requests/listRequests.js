const RequestsModel = require('../../models/requestsModel')

module.exports = async (req, res, next) => {
  const requests = await RequestsModel.find({}, { name: 1 })
  res.send({
    message: 'success',
    data: {
      requests
    }
  })
}
