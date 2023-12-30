const AuthorsModel = require('../../models/authorsModel')
const BooksModel = require('../../models/booksModel')

module.exports = async (req, res, next) => {
  try {
    const { address } = req.params
    if (!address) {
      return res.status(404).send({
        error: true,
        message: 'Invalid address'
      })
    }
    const book = await BooksModel.findOne({ address })
    if (!book) {
      return res.status(404).send({
        error: true,
        message: 'Invalid book'
      })
    }
    const bookAuthor = await AuthorsModel.find({ name: book.author })
    res.send({
      success: true,
      data: {
        book,
        bookAuthor
      }
    })
  } catch (error) {
    next(error)
  }
}
