const UserModel = require('../../models/usersModel')
const tokenService = require('../../services/tokenService')

module.exports = async (req, res, next) => {
  try {
    const { userName } = req.body
    const user = await UserModel.findOne({ userName })
    if (!user) {
      return res.status(404).send({
        status: 404,
        message: 'not found user'
      })
    }
    const token = tokenService.sign({ id: user._id })
    res.send({
      status: 200,
      message: '',
      token
    })
  } catch (error) {
    next(error)
  }
}
