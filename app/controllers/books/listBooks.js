const BooksModel = require('../../models/booksModel')

module.exports = async (req, res, next) => {
  const books = await BooksModel.find({})
  res.send({
    message: 'success',
    data: {
      books
    }
  })
}
