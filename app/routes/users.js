const express = require('express')
const router = express.Router()
const usersController = require('../controllers/users')

router.get('/', usersController.listUsers)
router.get('/login', usersController.loginUser)
router.post('/signup', usersController.signUpUser)
router.delete('/:userName', usersController.deleteUser)
router.patch('/:userName', usersController.updateUser)
router.patch('/forgot/:userAuth', usersController.forgotPass)

module.exports = router
