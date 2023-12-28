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
    const { n, nModified } = await CategoriesModel.updateOne({ finglish: category }, { ...req.body })
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
