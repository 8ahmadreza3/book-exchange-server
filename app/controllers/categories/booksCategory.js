const BooksModel = require('../../models/booksModel')

module.exports = (req, res, next) => {
  try {
    const { category } = req.params
    if (!category) {
      return res.status(404).send({
        error: true,
        message: 'Invalid'
      })
    }
    const books = BooksModel.find({ category })
    res.send({
      message: 'category books founded',
      date: {
        books
      }
    })
  } catch (error) {
    next(error)
  }
}
