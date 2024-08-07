const BooksModel = require('../../models/booksModel')

module.exports = async (req, res, next) => {
  try {
    const books = await BooksModel.find({})
    res.send({
      success: true,
      message: 'Found successfully',
      message_fa: 'با موفقیت پیدا شد',
      data: {
        books
      }
    })
  } catch (error) {
    next(error)
  }
}
