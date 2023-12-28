const express = require('express')
const router = express.Router()
const usersController = require('../controllers/users')

router.get('/', usersController.listUsers)
router.post('/signup', usersController.signUpUser)
router.delete('/:category', usersController.deleteUser)
router.patch('/:category', usersController.updateUser)
router.post('/login', usersController.loginUser)

module.exports = router
