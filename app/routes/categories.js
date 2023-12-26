const express = require('express')
const router = express.Router()
const categoriesController = require('../controllers/categories')

router.get('/', categoriesController.categoriesList)
router.post('/', categoriesController.categoriesAdd)

module.exports = router
