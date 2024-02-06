const CategoriesModel = require('../../models/categoriesModel')

module.exports = async (req, res, next) => {
  try {
    const categories = await CategoriesModel.find({}, { address: 0 })
    res.send({
      success: true,
      message: 'categories found',
      message_fa: 'دسته بندی پیدا شد',
      data: {
        categories
      }
    })
  } catch (error) {
    next(error)
  }
}
