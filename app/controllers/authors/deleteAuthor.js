const AuthorsModel = require('../../models/authorsModel')
const AWS = require('../../services/AWS')

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
    const author = await AuthorsModel.findOneAndDelete({ address })
    if (!author) {
      return res.send({
        success: false,
        message: 'Author not found',
        message_fa: 'نویسنده یافت نشد'
      })
    }
    if (author.awsKey.length > 0) {
      const remove = AWS.remove(author.awsKey)
      if (!remove.success) {
        return res.send(remove)
      }
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
