const AuthorsModel = require('../../models/authorsModel')

module.exports = async (req, res, next) => {
  const authors = await AuthorsModel.find({ isRecommend: true })
  res.send({
    success: true,
    message: 'finded recommended authors',
    message_fa: 'نویسنده های پیشنهادی پیدا شدند',
    data: {
      authors
    }
  })
}
