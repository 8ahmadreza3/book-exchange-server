const express = require('express')
const router = express.Router()
const categoriesController = require('../controllers/categories')

router.get('/', categoriesController.listCategories)
router.get('/:address', categoriesController.booksCategory)
router.post('/', categoriesController.addCategory)
router.delete('/:address', categoriesController.deleteCategory)
router.patch('/:address', categoriesController.updateCategory)

module.exports = router
