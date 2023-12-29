const express = require('express')
const router = express.Router()
const categoriesController = require('../controllers/categories')

router.get('/', categoriesController.listCategories)
router.post('/:category', categoriesController.category)
router.post('/', categoriesController.addCategory)
router.delete('/:category', categoriesController.deleteCategory)
router.patch('/:category', categoriesController.updateCategory)

module.exports = router
