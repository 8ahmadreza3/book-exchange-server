const express = require('express')
const router = express.Router()
const usersController = require('../controllers/users')

router.get('/', usersController.usersList)
router.post('/signup', usersController.signUp)
router.delete('/:category', usersController.deleteUser)
router.patch('/:category', usersController.patchUser)
router.post('/login', usersController.longIn)

module.exports = router
