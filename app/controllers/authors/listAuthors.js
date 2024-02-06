const AuthorModel = require('../../models/authorsModel')

module.exports = async (req, res, next) => {
  try {
    const authors = await AuthorModel.find(req.body)
    res.send({
      success: true,
      message: 'List of authors found',
      message_fa: 'لیست نویسندگان یافت شد',
      data: {
        authors
      }
    })
  } catch (error) {
    next(error)
  }
}
