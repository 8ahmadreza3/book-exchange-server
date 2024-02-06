const AuthorModel = require('../../models/authorsModel')

module.exports = async (req, res, next) => {
  try {
    const { address } = req.params
    if (!address) {
      return res.status(404).send({
        success: false,
        message: 'Author not found',
        message_fa: 'نویسنده یافت نشد'
      })
    }
    const { n, nModified } = await AuthorModel.updateOne({ address }, { ...req.body })
    if (n === 0 || nModified === 0) {
      return res.status(404).send({
        success: false,
        message: 'can not update author',
        message_fa: 'نمی توان نویسنده را به روز کرد'
      })
    }
    res.send({
      success: true,
      message: 'Author information updated',
      message_fa: 'اطلاعات نویسنده به روز شد'
    })
  } catch (error) {
    next(error)
  }
}
