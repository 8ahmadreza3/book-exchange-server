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
    let newAddress = address
    if (req.body.address) {
      req.body.address = req.body.address.replaceAll(' ', '_')
      newAddress = req.body.address
    }
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
    if (!oldCategory) {
      return res.send({
        success: false,
        message: 'can not update category',
        message_fa: 'نمی توان دسته را به روز کرد'
      })
    }
    await CategoriesModel.updateOne({ address }, { ...req.body })
    const newCategory = await CategoriesModel.findById(oldCategory._id)
    if (req.body.name && req.body.name !== oldCategory.name) {
      await BooksModel.updateMany({ category: oldCategory.name }, { category: newCategory.name })
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
