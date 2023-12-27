const UserModel = require('../models/userModel')
const tokenService = require('../services/tokenService')

module.exports.usersList = async (req, res, next) => {
  const users = await UserModel.find({})
  res.send({
    message: 'success',
    data: {
      users
    }
  })
}

module.exports.signUp = async (req, res, next) => {
  try {
    const {
      Name,
      userName,
      phone,
      // img
      state,
      city
    } = req.body
    const newUser = new UserModel({
      Name,
      userName,
      phone,
      img: '',
      state,
      city
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

module.exports.deleteUser = async (req, res, next) => {
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

module.exports.patchUser = async (req, res, next) => {
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

module.exports.longIn = async (req, res, next) => {
  try {
    const { phone } = req.body
    const user = await UserModel.findOne({ phone })
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
