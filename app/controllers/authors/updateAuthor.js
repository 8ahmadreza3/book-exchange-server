const AuthorModel = require('../../models/authorsModel')

module.exports = async (req, res, next) => {
  try {
    const { address } = req.params
    if (!address) {
      return res.status(404).send({
        error: true,
        message: 'Invalid author'
      })
    }
    const { n, nModified } = await AuthorModel.updateOne({ address }, { ...req.body })
    if (n === 0 || nModified === 0) {
      return res.status(404).send({
        error: true,
        message: 'can not update author'
      })
    }
    res.send({
      success: true,
      message: 'author information has been updated.'
    })
  } catch (error) {
    next(error)
  }
}
