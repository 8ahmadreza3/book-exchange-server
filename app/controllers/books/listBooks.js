const BooksModel = require('../../models/booksModel')

module.exports = async (req, res, next) => {
  const books = await BooksModel.find(req.body)
  res.send({
    success: true,
    message: 'Found successfully',
    message_fa: 'با موفقیت پیدا شد',
    data: {
      books
    }
  })
}
