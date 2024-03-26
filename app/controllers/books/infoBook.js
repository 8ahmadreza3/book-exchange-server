const BooksModel = require('../../models/booksModel')
const RequestsModel = require('../../models/requestsModel')
const ApplicantsModel = require('../../models/applicantsModel')

module.exports = async (req, res, next) => {
  try {
    const { address } = req.params
    if (!address) {
      return res.status(404).send({
        success: false,
        message: 'Invalid address',
        message_fa: 'آدرس نامعتبر'
      })
    }
    const book = await BooksModel.findOne({ address })
    if (!book) {
      return res.status(404).send({
        success: false,
        message: 'Invalid book',
        message_fa: 'کتاب نامعتبر'
      })
    }
    const requests = await RequestsModel.find({ book: book.name })
    const presentedRequests = requests.map(async request => {
      request.createdAt = dateService.toPersianDate(request.createdAt)
      request.applicants = await ApplicantsModel.find({ requestId: request._id })
      return request
    })
    res.send({
      success: true,
      message: 'book information found',
      message_fa: 'اطلاعات کتاب پیدا شد',
      data: {
        book,
        requests: presentedRequests
      }
    })
  } catch (error) {
    next(error)
  }
}
