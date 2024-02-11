const express = require('express')
const router = express.Router()
const searchController = require('../controllers/search')

router.get('/:keyWord', searchController.userSearch)
router.get('/admin/:keyWord', searchController.adminSearch)

module.exports = router
