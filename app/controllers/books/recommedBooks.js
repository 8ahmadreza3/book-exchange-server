const BooksModel = require('../../models/booksModel')

module.exports = async (req, res, next) => {
  const books = await BooksModel.find({ isRecommend: true })
  res.send({
    message: 'success',
    data: {
      books
    }
  })
}
