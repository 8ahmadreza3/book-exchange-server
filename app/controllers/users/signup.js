const UserModel = require('../../models/userModel')

module.exports = async (req, res, next) => {
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
      city,
      admin: false
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
