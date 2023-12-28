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
    await CategoriesModel.deleteOne({ finglish: category })
    res.send({
      success: true,
      message: 'category deleted'
    })
  } catch (error) {
    next(error)
  }
}
