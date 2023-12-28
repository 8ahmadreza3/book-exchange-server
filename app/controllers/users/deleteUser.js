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
    await UserModel.deleteOne({ userName })
    res.send({
      success: true,
      message: 'User deleted'
    })
  } catch (error) {
    next(error)
  }
}
