const BooksModel = require('../../models/booksModel')
const AuthorsModel = require('../../models/authorsModel')
const CategoriesModel = require('../../models/categoriesModel')
// const AWS = require('../../services/AWS')

module.exports = async (req, res, next) => {
  try {
    const { name, author, category, info, address } = req.body
    if (!name && !address) {
      res.send({
        success: false,
        message: 'Enter the information in full',
        message_fa: 'اطلاعات با به صورت کامل وارد کنید'
      })
    }
    // TODO
    // const upload = AWS.upload(req.files.image)
    // if (!upload.success) {
    //   return res.send(upload)
    // }

    const categoryAddress = await CategoriesModel.findOne({ name: category })
    const authorAddress = await AuthorsModel.findOne({ name: author })
    const newBook = new BooksModel({
      name,
      author: {
        name: author,
        address: authorAddress.length > 0 ? authorAddress : ''
      },
      category: {
        name: category,
        address: categoryAddress.length > 0 ? categoryAddress : ''
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
