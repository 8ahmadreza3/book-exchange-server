const AuthorsModel = require('../../models/authorsModel')

module.exports = async (req, res, next) => {
  try {
    const { address } = req.params
    if (!address) {
      return res.status(404).send({
        error: true,
        message: 'Invalid id'
      })
    }
    const { acknowledged, deletedCount } = await AuthorsModel.deleteOne({ address })
    if (deletedCount === 0) {
      return res.send({
        acknowledged,
        error: true,
        message: 'author not found'
      })
    }
    res.send({
      success: true,
      message: 'author deleted'
    })
  } catch (error) {
    next(error)
  }
}
