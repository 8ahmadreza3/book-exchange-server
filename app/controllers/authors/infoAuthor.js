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
    const author = await AuthorsModel.findOne({ address })
    if (!author) {
      return res.status(404).send({
        error: true,
        message: 'Invalid Author'
      })
    }
    const authorBooks = await BooksModel.find({ author: author.name })
    res.send({
      success: true,
      data: {
        author,
        books: authorBooks
      }
    })
  } catch (error) {
    next(error)
  }
}
