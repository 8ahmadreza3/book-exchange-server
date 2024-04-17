const BooksModel = require('../../models/booksModel')

module.exports = async (req, res, next) => {
  try {
    const { name, author, awsKey, category, info, isRecommend } = req.body
    if (!name || !author) {
      res.send({
        success: false,
        message: 'Enter the information in full',
        message_fa: 'اطلاعات را به صورت کامل وارد کنید'
      })
    }
    const img = awsKey ? process.env.LIARA_URL + awsKey + '.png' : ''
    const newBook = new BooksModel({
      name,
      author,
      category,
      info,
      isRecommend: isRecommend || false,
      img,
      awsKey: awsKey || ''
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
