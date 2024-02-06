const AuthorsModel = require('../../models/authorsModel')
const BooksModel = require('../../models/booksModel')

module.exports = async (req, res, next) => {
  try {
    const { address } = req.params
    if (!address) {
      return res.status(404).send({
        success: false,
        message: 'Invalid address',
        message_fa: 'آدرس نامعتبر'
      })
    }
    const book = await BooksModel.findOne({ address })
    if (!book) {
      return res.status(404).send({
        success: false,
        message: 'Invalid book',
        message_fa: 'کتاب نامعتبر'
      })
    }
    const bookAuthor = await AuthorsModel.findOne({ name: book.author })
    res.send({
      success: true,
      message: 'book information found',
      message_fa: 'اطلاعات کتاب پیدا شد',
      data: {
        book,
        author: bookAuthor
      }
    })
  } catch (error) {
    next(error)
  }
}
