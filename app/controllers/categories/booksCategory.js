const BooksModel = require('../../models/booksModel')
const CategoriesModel = require('../../models/categoriesModel')

module.exports = async (req, res, next) => {
  try {
    const address = req.params.address.replaceAll(' ', '_').toLowerCase()
    if (!address) {
      return res.send({
        success: false,
        message: 'Invalid category',
        message_fa: 'دسته نامعتبر'
      })
    }
    const category = await CategoriesModel.findOne({ address })
    if (!category) {
      return res.send({
        success: false,
        message: 'There is no such category',
        message_fa: 'چنین دسته بندی وجود ندارد'
      })
    }
    const books = await BooksModel.find({ category: category.name })
    res.send({
      success: true,
      message: 'category books founded',
      message_fa: 'کتاب های دسته بندی پیدا شد',
      date: {
        books
      }
    })
  } catch (error) {
    next(error)
  }
}
