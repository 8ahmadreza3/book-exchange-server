const UserModel = require('../../models/usersModel')
const hashServices = require('../../services/dateService')

module.exports = async (req, res, next) => {
  try {
    const {
      Name,
      userName,
      phone,
      state,
      city,
      password
    } = req.body
    const hashPassword = hashServices.hashPassword(password)
    const newUser = new UserModel({
      Name,
      userName,
      phone,
      img: '',
      state,
      city,
      admin: false,
      password: hashPassword
    })
    await newUser.save()
    res.status(201).send({
      success: true,
      message: 'new User added',
      newUser
    })
  } catch (error) {
    next(error)
  }
}
