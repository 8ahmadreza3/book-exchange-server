const CategoriesModel = require('../../models/categoriesModel')

module.exports = async (req, res, next) => {
  try {
    const { address } = req.params
    if (!address) {
      return res.status(404).send({
        success: false,
        message: 'Invalid category',
        message_fa: 'دسته نامعتبر'
      })
    }
    const { n, nModified } = await CategoriesModel.updateOne({ address }, { ...req.body })
    if (n === 0 || nModified === 0) {
      return res.status(404).send({
        success: true,
        message: 'can not update category',
        message_fa: 'نمی توان دسته را به روز کرد'
      })
    }
    res.send({
      success: true,
      message: 'Category information has been updated',
      message_fa: 'اطلاعات دسته به روز شد'
    })
  } catch (error) {
    next(error)
  }
}
