const express = require('express')
const router = express.Router()
const usersController = require('../controllers/users')

router.get('/', usersController.listUsers)
router.get('/login', usersController.loginUser)
router.post('/signup', usersController.signUpUser)
router.delete('/:user-name', usersController.deleteUser)
router.patch('/:userName', usersController.updateUser)

module.exports = router
