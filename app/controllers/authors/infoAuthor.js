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
    const author = await AuthorsModel.findOne({ address })
    if (!author) {
      return res.status(404).send({
        success: false,
        message: 'Author not found',
        message_fa: 'نویسنده یافت نشد'
      })
    }
    const authorBooks = await BooksModel.findOne({ author: author.name })
    res.send({
      success: true,
      message: 'Author information found',
      message_fa: 'اطلاعات نویسنده یافت شد',
      data: {
        author,
        books: authorBooks
      }
    })
  } catch (error) {
    next(error)
  }
}
