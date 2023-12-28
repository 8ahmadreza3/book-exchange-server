const CategoriesModel = require('../../models/categoriesModel')

module.exports = async (req, res, next) => {
  try {
    const { category } = req.params
    if (!category) {
      return res.status(404).send({
        error: true,
        message: 'Invalid'
      })
    }
    const { acknowledged, deletedCount } = await CategoriesModel.deleteOne({ finglish: category })
    if (deletedCount === 0) {
      return res.send({
        acknowledged,
        error: true,
        message: 'user not found'
      })
    }
    res.send({
      success: true,
      message: 'category deleted'
    })
  } catch (error) {
    next(error)
  }
}
