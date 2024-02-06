const express = require('express')
const router = express.Router()
const usersController = require('../controllers/users')

router.get('/', usersController.listUsers)
router.post('/signup', usersController.signUpUser)
router.post('/login', usersController.loginUser)
router.delete('/:userName', usersController.deleteUser)
router.patch('/:userName', usersController.updateUser)

module.exports = router
