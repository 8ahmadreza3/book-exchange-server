const AuthorModel = require('../../models/authorsModel')

module.exports = async (req, res, next) => {
  const author = await AuthorModel.find({})
  res.send({
    message: 'success',
    data: {
      author
    }
  })
}
