const express = require('express')
const router = express.Router()
const usersController = require('../controllers/users')

router.get('/', usersController.usersList)
router.post('/', usersController.signUp)
router.delete('/:category', usersController.deleteUser)
router.patch('/:category', usersController.patchUser)

module.exports = router
