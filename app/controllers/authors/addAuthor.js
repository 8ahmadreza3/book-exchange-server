const AuthorModel = require('../../models/authorsModel')

module.exports = async (req, res, next) => {
  try {
    const { name, birthYear, deadYear, info, books } = req.body
    const newAuthor = new AuthorModel({
      name,
      birthYear,
      deadYear,
      info,
      books
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
