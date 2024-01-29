const BooksModel = require('../../models/booksModel')

module.exports = async (req, res, next) => {
  const books = await BooksModel.find({ isRecommend: true })
  res.send({
    success: true,
    message: 'finded recommended books',
    message_fa: 'کتاب های پیشنهادی پیدا شدند',
    data: {
      books
    }
  })
}
