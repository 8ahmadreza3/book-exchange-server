const BooksModel = require('../../models/booksModel')
const AuthorsModel = require('../../models/authorsModel')
const CategoriesModel = require('../../models/categoriesModel')
// const AWS = require('../../services/AWS')

module.exports = async (req, res, next) => {
  try {
    const { name, author, category, info, address } = req.body
    // TODO
    // const upload = AWS.upload(req.files.image)
    // if (!upload.success) {
    //   return res.send(upload)
    // }

    let categoryAddress = await CategoriesModel.findOne({ name: category }).address
    let authorAddress = await AuthorsModel.findOne({ name: author }).address
    categoryAddress = categoryAddress || ''
    authorAddress = authorAddress || ''
    const newBook = new BooksModel({
      name,
      author: {
        name: author,
        address: authorAddress
      },
      category: {
        name: category,
        address: categoryAddress
      },
      info,
      address
      // img: upload.url,
      // awsKey: upload.awsKey
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
