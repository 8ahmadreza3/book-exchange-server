const CategoriesModel = require('../../models/categoriesModel')
const BooksModel = require('../../models/booksModel')

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
    req.body.address = req.body.address.replaceAll(' ', '_')
    const newAddress = req.body.address
    if (newAddress && newAddress !== address) {
      const sameAddress = await CategoriesModel.findOne({ address: newAddress })
      if (sameAddress) {
        res.send({
          success: false,
          message: 'This address is duplicate',
          message_fa: 'این آدرس تکراری است'
        })
      }
    }
    const oldCategory = await CategoriesModel.findOne({ address })
    const newCategory = await CategoriesModel.findOneAndUpdate({ address }, { ...req.body })
    if (!oldCategory) {
      return res.status(404).send({
        success: true,
        message: 'can not update category',
        message_fa: 'نمی توان دسته را به روز کرد'
      })
    }
    await BooksModel.updateMany({ category: oldCategory.name }, { category: newCategory.name })
    res.send({
      success: true,
      message: 'Category information has been updated',
      message_fa: 'اطلاعات دسته به روز شد'
    })
  } catch (error) {
    next(error)
  }
}
