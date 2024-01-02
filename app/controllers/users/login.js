const UserModel = require('../../models/usersModel')
const tokenService = require('../../services/tokenService')
const hashServices = require('../../services/hashService')

module.exports = async (req, res, next) => {
  try {
    const { userName, password } = req.body
    const user = await UserModel.findOne({ userName })
    if (!user) {
      return res.status(404).send({
        status: 404,
        message: 'not found user'
      })
    }
    if (hashServices.comparePassword(password, user.password)) {
      return res.render({
        error: true,
        message: 'can not login'
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
