const CategoriesModel = require('../../models/categoriesModel')

module.exports = async (req, res, next) => {
  try {
    const { name, address } = req.body
    const newCategory = new CategoriesModel({
      name,
      address,
      isRecommend: false
    })
    await newCategory.save()
    res.status(201).send({
      success: true,
      message: 'new category added',
      message_fa: 'دسته جدید اضافه شد'
    })
  } catch (error) {
    next(error)
  }
}
