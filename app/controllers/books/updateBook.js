const BooksModel = require('../../models/booksModel')

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
    const { n, nModified } = await BooksModel.updateOne({ address }, { ...req.body })
    if (n === 0 || nModified === 0) {
      return res.status(404).send({
        success: true,
        message: 'Can not update book',
        message_fa: 'نمی توان کتاب را به روز کرد'
      })
    }
    res.send({
      success: true,
      message: 'book information has been updated',
      message_fa: 'اطلاعات کتاب به روز شد'
    })
  } catch (error) {
    next(error)
  }
}
