const AuthorsModel = require('../../models/authorsModel')
const AWS = require('../../services/AWS')

module.exports = async (req, res, next) => {
  try {
    const { name, birthYear, deadYear, biography, address } = req.body
    if (!name && !address) {
      res.send({
        success: false,
        message: 'Enter the information in full',
        message_fa: 'اطلاعات با به صورت کامل وارد کنید'
      })
    }

    const upload = AWS.upload(req.files.image)
    if (!upload.success) {
      return res.send(upload)
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
