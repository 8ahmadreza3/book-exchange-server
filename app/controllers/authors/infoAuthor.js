const AuthorModel = require('../../models/authorsModel')

module.exports = async (req, res, next) => {
  try {
    const { id } = req.params
    if (!id) {
      return res.status(404).send({
        error: true,
        message: 'Invalid id'
      })
    }
    const author = await AuthorModel.findOne({ _id: id })
    if (!author) {
      return res.status(404).send({
        error: true,
        message: 'Invalid Author'
      })
    }
    res.send({
      success: true,
      data: {
        author
      }
    })
  } catch (error) {
    next(error)
  }
}
