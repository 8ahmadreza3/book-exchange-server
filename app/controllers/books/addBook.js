const BooksModel = require('../../models/booksModel')
// const AWS = require('../../services/AWS')

module.exports = async (req, res, next) => {
  try {
    const { name, author, category, info, isRecommend } = req.body
    if (!name || !author) {
      res.send({
        success: false,
        message: 'Enter the information in full',
        message_fa: 'اطلاعات را به صورت کامل وارد کنید'
      })
    }
    // let upload
    // if (req.files) {
    //   upload = AWS.upload(req.files.image)
    //   if (!upload.success) {
    //     return res.send(upload)
    //   }
    // }

    const newBook = new BooksModel({
      name,
      author,
      category,
      info,
      isRecommend: isRecommend || false
      // img: upload.url || '',
      // awsKey: upload.awsKey || ''
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
