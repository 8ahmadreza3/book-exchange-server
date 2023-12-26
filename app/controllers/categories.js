const CategoriesModel = require('../models/categoriesModel')

module.exports.categoriesList = async (req, res, next) => {
  const categories = await CategoriesModel.find({}, { categoryName: 1 })
  res.send({
    message: 'success',
    data: {
      categories
    }
  })
}

module.exports.categoriesAdd = async (req, res, next) => {
  try {
    const { categoryName } = req.body
    const newCategory = new CategoriesModel({
      categoryName
    })
    await newCategory.save()
    res.status(201).send({
      success: true,
      message: 'new categories added',
      newCategory
    })
  } catch (error) {
    next(error)
  }
}
