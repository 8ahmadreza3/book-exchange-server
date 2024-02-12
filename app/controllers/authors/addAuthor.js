const AuthorsModel = require('../../models/authorsModel')
const AWS = require('../../services/AWS')

module.exports = async (req, res, next) => {
  try {
    const { name, birthYear, deadYear, biography, address } = req.body

    const upload = AWS.upload(req.files.image)
    if (!upload.success) {
      return res.send({
        success: false,
        message: 'Cloud storage error',
        message_fa: 'خطای ذخیره سازی ابری',
        error: upload.error
      })
    }

    const newAuthor = new AuthorsModel({
      name,
      birthYear,
      deadYear,
      biography,
      address,
      img: upload.url,
      awsKey: upload.awsKey
    })
    await newAuthor.save()
    res.status(201).send({
      success: true,
      message: 'new author New author added',
      message_fa: 'نویسنده جدید اضافه شد'
    })
  } catch (error) {
    next(error)
  }
}
