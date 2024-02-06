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
      img: '',
      books: []
    })
    await newAuthor.save()
    res.status(201).send({
      success: true,
      message: 'new author added',
      newAuthor
    })
  } catch (error) {
    next(error)
  }
}
