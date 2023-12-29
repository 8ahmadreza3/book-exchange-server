const booksModel = require('../../models/booksModel')

module.exports = async (req, res, next) => {
  try {
    const { address } = req.params
    if (!address) {
      return res.status(404).send({
        error: true,
        message: 'Invalid book'
      })
    }
    const { acknowledged, deletedCount } = await booksModel.deleteOne({ address })
    if (deletedCount === 0) {
      return res.send({
        acknowledged,
        message: 'book not found'
      })
    }
    res.send({
      success: true,
      message: 'book deleted'
    })
  } catch (error) {
    next(error)
  }
}
