const UserModel = require('../../models/userModel')

module.exports = async (req, res, next) => {
  try {
    const { id } = req.params
    if (!id) {
      return res.status(404).send({
        error: true,
        message: 'Invalid User'
      })
    }
    const { n, nModified } = await UserModel.updateOne({ _id: id }, { ...req.body })
    if (n === 0 || nModified === 0) {
      return res.status(404).send({
        error: true,
        message: 'Can not update User'
      })
    }
    res.send({
      success: true,
      message: 'User information has been updated.'
    })
  } catch (error) {
    next(error)
  }
}
