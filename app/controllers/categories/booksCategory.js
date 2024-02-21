const BooksModel = require('../../models/booksModel')

module.exports = (req, res, next) => {
  try {
    const { address } = req.params
    if (!address) {
      return res.status(404).send({
        success: false,
        message: 'Invalid category',
        message_fa: 'دسته نامعتبر'
      })
    }
    const books = BooksModel.find({ address })
    res.send({
      success: true,
      message: 'category books founded',
      message_fa: 'دسته بندی کتاب تاسیس شد',
      date: {
        books
      }
    })
  } catch (error) {
    next(error)
  }
}
