const CategoriesModel = require('../models/categoriesModel')

module.exports.categoriesList = (req, res, next) => {
  res.send()
}

module.exports.categoriesAdd = async (req, res, next) => {
  try {
    const newCategory = new CategoriesModel({
      categoryName: ''
    })
    await newCategory.save()
    res.send({
      success: true,
      message: 'new categories added'
    })
  } catch (error) {
    next(error)
  }
}
