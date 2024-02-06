const BooksModel = require('../../models/booksModel')
const AuthorsModel = require('../../models/authorsModel')
const CategoriesModel = require('../../models/categoriesModel')
const RequestsModel = require('../../models/requestsModel')
const UsersModel = require('../../models/usersModel')

module.exports = async (req, res, next) => {
  try {
    const { keyWord } = req.params
    if (!keyWord) {
      return res.send({
        success: false,
        message: 'Keyword not found',
        message_fa: 'کلمه کلیدی یافت نشد'
      })
    }
    const books = BooksModel.find()
    const authors = AuthorsModel.find()
    const categories = CategoriesModel.find()
    const requests = RequestsModel.find()
    const users = UsersModel.find()
    res.status(201).send({
      success: true,
      message: 'new author The search was done in all databases',
      message_fa: 'جستجو در تمامی پایگاه داده انجام شد',
      data: {
        books,
        authors,
        categories,
        admin: {
          requests,
          users
        }
      }
    })
  } catch (error) {
    next(error)
  }
}
