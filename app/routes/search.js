const express = require('express')
const router = express.Router()
const searchController = require('../controllers/search')
const authAdmin = require('../middlewares/authAdmin')

router.get('/:keyWord', searchController.search)
router.get('/admin/:keyWord', [authAdmin], searchController.adminSearch)

module.exports = router
