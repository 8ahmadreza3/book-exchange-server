const BooksModel = require('../../models/booksModel')

module.exports = async (req, res, next) => {
  const books = await BooksModel.find({}, { name: 1, category: 1, author: 1, info: 1 })
  res.send({
    message: 'success',
    data: {
      books
    }
  })
}
