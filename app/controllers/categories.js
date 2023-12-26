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

module.exports.categoryAdd = async (req, res, next) => {
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

module.exports.categoryDelete = async (req, res, next) => {
  try {
    const { category } = req.params
    if (!category) {
      return res.status(404).send({
        error: true,
        message: 'Invalid'
      })
    }
    await CategoriesModel.deleteOne({ categoryName: category })
    res.send({
      success: true,
      message: 'category deleted'
    })
  } catch (error) {
    next(error)
  }
}

module.exports.patchCategory = async (req, res, next) => {
  try {
    const { category } = req.params
    if (!category) {
      return res.status(404).send({
        error: true,
        message: 'Invalid'
      })
    }
    const { n, nModified } = await CategoriesModel.updateOne({ categoryName: category }, { ...req.body })
    if (n === 0 || nModified === 0) {
      return res.status(404).send({
        error: true,
        message: 'can not update'
      })
    }
    res.send({
      success: true,
      message: `Category ${category}'s information has been updated.`
    })
  } catch (error) {
    next(error)
  }
}
