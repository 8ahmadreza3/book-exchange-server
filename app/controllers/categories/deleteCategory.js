const CategoriesModel = require('../../models/categoriesModel')

module.exports = async (req, res, next) => {
  try {
    const address = req.params.address.replaceAll(' ', '_').toLowerCase()
    if (!address) {
      return res.status(404).send({
        success: false,
        message: 'Invalid category',
        message_fa: 'دسته نامعتبر'
      })
    }
    const { deletedCount } = await CategoriesModel.deleteOne({ address })
    if (deletedCount === 0) {
      return res.send({
        success: false,
        message: 'category not found',
        message_fa: 'دسته پیدا نشد'
      })
    }
    res.send({
      success: true,
      message: 'category deleted',
      message_fa: 'دسته حذف شد'
    })
  } catch (error) {
    next(error)
  }
}
