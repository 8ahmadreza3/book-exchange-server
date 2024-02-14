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
    const { awsKey } = await BooksModel.findOne({ bookID })
    const { deletedCount } = await BooksModel.deleteOne({ bookID })
    if (deletedCount === 0) {
      return res.send({
        success: false,
        message: 'book not found',
        message_fa: 'کتاب پیدا نشد'
      })
    }

    const remove = AWS.remove(awsKey)
    if (!remove.success) {
      return res.send(remove)
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
