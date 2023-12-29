const UserModel = require('../../models/userModel')

module.exports = async (req, res, next) => {
  try {
    const { userName } = req.params
    if (!userName) {
      return res.status(404).send({
        error: true,
        message: 'Invalid User'
      })
    }
    const { acknowledged, deletedCount } = await UserModel.deleteOne({ userName })
    if (deletedCount === 0) {
      return res.send({
        acknowledged,
        message: 'user not found'
      })
    }
    res.send({
      success: true,
      message: 'User deleted'
    })
  } catch (error) {
    next(error)
  }
}
