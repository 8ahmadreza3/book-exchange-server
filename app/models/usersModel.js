const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema({
  name: { type: String, minlength: 3 },
  userName: { type: String, unique: true, minlength: 3 },
  phone: { type: String, unique: true },
  img: String,
  state: String,
  city: String,
  isAdmin: { type: Boolean, default: false },
  password: String,
  awsKey: String
})
const userModel = mongoose.model('User', usersSchema)

module.exports = userModel
