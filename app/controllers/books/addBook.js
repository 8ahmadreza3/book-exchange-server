const BooksModel = require('../../models/booksModel')
const AuthorsModel = require('../../models/authorsModel')
const CategoriesModel = require('../../models/categoriesModel')
const AWS = require('../../services/AWS')

module.exports = async (req, res, next) => {
  try {
    const { name, author, category, info } = req.body
    let upload
    if (req.files) {
      upload = AWS.upload(req.files.image)
      if (!upload.success) {
        return res.send(upload)
      }
    }

    const categoryAddress = await CategoriesModel.findOne({ name: category }).address
    const authorAddress = await AuthorsModel.findOne({ name: author }).address
    const newBook = new BooksModel({
      name,
      author: {
        name: author,
        address: authorAddress || ''
      },
      category: {
        name: category,
        address: categoryAddress || ''
      },
      info,
      img: upload.url || '',
      awsKey: upload.awsKey || ''
    })
    await newBook.save()
    res.status(201).send({
      success: true,
      message: 'New book added',
      message_fa: 'کتاب جدید اضافه شد'
    })
  } catch (error) {
    next(error)
  }
}
