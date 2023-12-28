const CategoriesModel = require('../../models/categoriesModel')

module.exports = async (req, res, next) => {
  const categories = await CategoriesModel.find({}, { name: 1 })
  res.send({
    message: 'success',
    data: {
      categories
    }
  })
}
