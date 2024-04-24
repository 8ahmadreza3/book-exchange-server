const express = require('express')
const router = express.Router()
const categoriesController = require('../controllers/categories')
const authAdmin = require('../middlewares/authAdmin')

router.get('/', categoriesController.listCategories)
router.get('/recommend', categoriesController.recommend)
router.get('/:address', categoriesController.booksCategory)
router.post('/', [authAdmin], categoriesController.addCategory)
router.delete('/:address', [authAdmin], categoriesController.deleteCategory)
router.patch('/:address', [authAdmin], categoriesController.updateCategory)

module.exports = router
