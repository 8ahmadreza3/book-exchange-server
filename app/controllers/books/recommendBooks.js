const BooksModel = require('../../models/booksModel')

module.exports = async (req, res, next) => {
  const books = await BooksModel.find({ isRecommend: true }, { name: 0, author: 0, category: 0, info: 0 })
  res.send({
    success: true,
    message: 'finded recommended books',
    message_fa: 'کتاب های پیشنهادی پیدا شدند',
    data: {
      books
    }
  })
}
