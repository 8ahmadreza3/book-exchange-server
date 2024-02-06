const BooksModel = require('../../models/booksModel')

module.exports = (req, res, next) => {
  try {
    const { category } = req.params
    if (!category) {
      return res.status(404).send({
        success: false,
        message: 'Invalid category',
        message_fa: 'دسته نامعتبر'
      })
    }
    const books = BooksModel.find({ category })
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
