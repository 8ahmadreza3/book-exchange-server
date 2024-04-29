const BooksModel = require('../../models/booksModel')
const AWS = require('../../services/AWS')

module.exports = async (req, res, next) => {
  try {
    const { bookID } = req.params
    if (!bookID) {
      return res.status(404).send({
        success: false,
        message: 'Invalid book',
        message_fa: 'کتاب نامعتبر'
      })
    }
    const book = await BooksModel.findByIdAndDelete(bookID)
    if (!book) {
      return res.send({
        success: false,
        message: 'book not found',
        message_fa: 'کتاب پیدا نشد'
      })
    }
    if (book.awsKey.length > 0) {
      const remove = AWS.remove(book.awsKey)
      if (!remove.success) {
        return res.send(remove)
      }
    }

    res.send({
      success: true,
      message: 'book deleted',
      message_fa: 'کتاب حذف شد'
    })
  } catch (error) {
    next(error)
  }
}
