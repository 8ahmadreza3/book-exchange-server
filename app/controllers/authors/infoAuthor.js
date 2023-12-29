const AuthorModel = require('../../models/authorsModel')

module.exports = async (req, res, next) => {
  try {
    const { address } = req.params
    if (!address) {
      return res.status(404).send({
        error: true,
        message: 'Invalid id'
      })
    }
    const author = await AuthorModel.findOne({ address })
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
