const AuthorsModel = require('../../models/authorsModel')

module.exports = async (req, res, next) => {
  try {
    const { name, birthYear, deadYear, biography, address } = req.body
    const newAuthor = new AuthorsModel({
      name,
      birthYear,
      deadYear,
      biography,
      address,
      img: ''
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
