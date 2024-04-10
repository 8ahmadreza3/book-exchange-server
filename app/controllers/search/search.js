const BooksModel = require('../../models/booksModel')
const AuthorsModel = require('../../models/authorsModel')
const CategoriesModel = require('../../models/categoriesModel')

module.exports = async (req, res, next) => {
  try {
    let { keyWord } = req.params
    if (!keyWord) {
      return res.send({
        success: false,
        message: 'Keyword not found',
        message_fa: 'کلمه کلیدی یافت نشد'
      })
    }
    keyWord = keyWord.replaceAll('_', ' ')
    const books = await BooksModel.find({
      $or: [
        { name: { $regex: `${keyWord}`, $options: 'i' } },
        { author: { $regex: `${keyWord}`, $options: 'i' } },
        { category: { $regex: `${keyWord}`, $options: 'i' } }
      ]
    })
    const authors = await AuthorsModel.find({
      $or: [
        { name: { $regex: `${keyWord}`, $options: 'i' } },
        { bioGraphy: { $regex: `${keyWord}`, $options: 'i' } }
      ]
    })
    const categories = await CategoriesModel.find({
      $or: [
        { name: { $regex: `${keyWord}`, $options: 'i' } }
      ]
    })
    res.status(201).send({
      success: true,
      message: 'new author The search was done in all databases',
      message_fa: 'جستجو در تمامی پایگاه داده انجام شد',
      data: {
        books,
        authors,
        categories
      }
    })
  } catch (error) {
    next(error)
  }
}
