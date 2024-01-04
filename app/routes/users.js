const express = require('express')
const router = express.Router()
const usersController = require('../controllers/users')

router.get('/', usersController.listUsers)
router.get('/search', usersController.searchUsers)
router.post('/signup', usersController.signUpUser)
router.post('/login', usersController.loginUser)
router.delete('/:category', usersController.deleteUser)
router.patch('/:category', usersController.updateUser)

module.exports = router
