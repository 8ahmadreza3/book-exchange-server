const BooksModel = require('../../models/booksModel')

module.exports = async (req, res, next) => {
  try {
    const { address } = req.params
    if (!address) {
      return res.status(404).send({
        error: true,
        message: 'Invalid book'
      })
    }
    const { n, nModified } = await BooksModel.updateOne({ address }, { ...req.body })
    if (n === 0 || nModified === 0) {
      return res.status(404).send({
        error: true,
        message: 'Can not update book'
      })
    }
    res.send({
      success: true,
      message: 'book information has been updated.'
    })
  } catch (error) {
    next(error)
  }
}
