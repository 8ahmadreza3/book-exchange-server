const AuthorsModel = require('../../models/authorsModel')

module.exports = async (req, res, next) => {
  try {
    const { address } = req.params
    if (!address) {
      return res.status(404).send({
        success: false,
        message: 'Invalid address',
        message_fa: 'آدرس نامعتبر'
      })
    }
    const { deletedCount } = await AuthorsModel.deleteOne({ address })
    if (deletedCount === 0) {
      return res.send({
        success: false,
        message: 'Author not found',
        message_fa: 'نویسنده یافت نشد'
      })
    }
    res.send({
      success: true,
      message: 'The author was removed',
      message_fa: 'نویسنده حذف شد'
    })
  } catch (error) {
    next(error)
  }
}
