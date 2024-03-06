const BooksModel = require('../../models/booksModel')

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
    if (req.body.address) {
      req.body.address = req.body.address.replaceAll(' ', '_')
      const sameAddress = await BooksModel.findOne({ address: req.body.address })
      if (sameAddress) {
        return res.send({
          success: false,
          message: 'This address is duplicate',
          message_fa: 'این آدرس تکراری است'
        })
      }
    }
    const { n, nModified } = await BooksModel.updateOne({ _id: bookID }, { ...req.body })
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
