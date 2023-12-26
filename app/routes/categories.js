const express = require('express')
const router = express.Router()
const categoriesController = require('../controllers/categories')

router.get('/', categoriesController.categoriesList)
router.post('/', categoriesController.categoryAdd)
router.delete('/:category', categoriesController.categoryDelete)
router.patch('/:category', categoriesController.patchCategory)

module.exports = router
