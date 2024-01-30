const AuthorsModel = require('../../models/authorsModel')

module.exports = async (req, res, next) => {
  const authors = await AuthorsModel.find({ isRecommend: true }, { birthYear: 0, deadYear: 0, bioGraphy: 0, books: 0 })
  res.send({
    success: true,
    message: 'finded recommended authors',
    message_fa: 'نویسنده های پیشنهادی پیدا شدند',
    data: {
      authors
    }
  })
}
