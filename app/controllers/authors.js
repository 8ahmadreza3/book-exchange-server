const AuthorModel = require('../models/authorsModel')

module.exports.addAuthor = async (req, res, next) => {
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

module.exports.authorsList = async (req, res, next) => {
  const author = await AuthorModel.find({})
  res.send({
    message: 'success',
    data: {
      author
    }
  })
}

module.exports.authorInfo = async (req, res, next) => {
  try {
    const { id } = req.params
    if (!id) {
      return res.status(404).send({
        error: true,
        message: 'Invalid id'
      })
    }
    const author = await AuthorModel.findOne({ _id: id })
    if (!author) {
      return res.status(404).send({
        error: true,
        message: 'Invalid Author'
      })
    }
    res.send({
      success: true,
      data: {
        author
      }
    })
  } catch (error) {
    next(error)
  }
}
