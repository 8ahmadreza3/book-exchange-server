const AuthorModel = require('../../models/authorsModel')

module.exports = async (req, res, next) => {
  const authors = await AuthorModel.find(req.body)
  res.send({
    success: true,
    message: 'Found successfully',
    message_fa: 'با موفقیت پیدا شد',
    data: {
      authors
    }
  })
}
