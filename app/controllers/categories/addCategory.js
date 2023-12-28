const CategoriesModel = require('../../models/categoriesModel')

module.exports = async (req, res, next) => {
  try {
    const { name, finglish } = req.body
    const newCategory = new CategoriesModel({
      name,
      finglish
    })
    await newCategory.save()
    res.status(201).send({
      success: true,
      message: 'new category added',
      newCategory
    })
  } catch (error) {
    next(error)
  }
}
