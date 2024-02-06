const booksModel = require('../../models/booksModel')

module.exports = async (req, res, next) => {
  try {
    const { address } = req.params
    if (!address) {
      return res.status(404).send({
        success: false,
        message: 'Invalid book',
        message_fa: 'کتاب نامعتبر'
      })
    }
    const { deletedCount } = await booksModel.deleteOne({ address })
    if (deletedCount === 0) {
      return res.send({
        success: false,
        message: 'book not found',
        message_fa: 'کتاب پیدا نشد'
      })
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
