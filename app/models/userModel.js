const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema({
  Name: String,
  userName: {
    type: String,
    unique: true
  },
  phone: {
    type: String,
    unique: true
  },
  img: String,
  state: String,
  city: String
})

const userModel = mongoose.model('User', usersSchema)

module.exports = userModel
