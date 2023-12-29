const AuthorModel = require('../../models/authorsModel')

module.exports = async (req, res, next) => {
  const authors = await AuthorModel.find({})
  res.send({
    message: 'success',
    data: {
      authors
    }
  })
}
