const UserModel = require('../../models/usersModel')

module.exports = async (req, res, next) => {
  try {
    const { userName } = req.params
    if (!userName) {
      return res.status(404).send({
        error: true,
        message: 'Invalid User'
      })
    }
    const { n, nModified } = await UserModel.updateOne({ userName }, { ...req.body })
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
