const AuthorModel = require('../../models/authorsModel')

module.exports = async (req, res, next) => {
  try {
    const filter = req.body ? req.body : {}
    const authors = await AuthorModel.find(filter)
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
