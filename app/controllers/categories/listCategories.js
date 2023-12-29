const CategoriesModel = require('../../models/categoriesModel')

module.exports = async (req, res, next) => {
  const categories = await CategoriesModel.find({}, { address: 0 })
  res.send({
    message: 'success',
    data: {
      categories
    }
  })
}
