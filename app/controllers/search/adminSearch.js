const BooksModel = require('../../models/booksModel')
const AuthorsModel = require('../../models/authorsModel')
const CategoriesModel = require('../../models/categoriesModel')
const RequestsModel = require('../../models/requestsModel')
const UsersModel = require('../../models/usersModel')
const ApplicantsModel = require('../../models/applicantsModel')
const dateService = require('../../services/dateService')

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
    const users = await UsersModel.find({
      $or: [
        { name: { $regex: `${keyWord}`, $options: 'i' } },
        { userName: { $regex: `${keyWord}`, $options: 'i' } },
        { phone: { $regex: `${keyWord}`, $options: 'i' } },
        { city: { $regex: `${keyWord}`, $options: 'i' } }
      ]
    })
    const allRequests = await RequestsModel.find({})
    const allApplicants = await ApplicantsModel.find({})
    const userRequests = await RequestsModel.find({
      $or: [
        { owner: { $regex: `${keyWord}`, $options: 'i' } },
        { book: { $regex: `${keyWord}`, $options: 'i' } },
        { getter: { $regex: `${keyWord}`, $options: 'i' } }
      ]
    })
    const requests = userRequests.map(request => {
      request.applicants = allApplicants.filter(applicant => {
        return applicant.requestId === request._id.toString()
      })
      return request
    })
    const userApplicants = await ApplicantsModel.find({ userName: { $regex: `${keyWord}`, $options: 'i' } })
    const applicants = userApplicants.map(applicant => {
      const request = allRequests.find(request => {
        return request._id.toString() === applicant.requestId
      })
      request.createdAt = dateService.toPersianDate(request.createdAt)
      request.applicants = [applicant]
      return request
    })

    res.status(201).send({
      success: true,
      message: 'new author The search was done in all databases',
      message_fa: 'جستجو در تمامی پایگاه داده انجام شد',
      data: {
        books,
        authors,
        categories,
        requests: [...requests, ...applicants],
        users
      }
    })
  } catch (error) {
    next(error)
  }
}
