const BooksModel = require('../models/booksModel')

module.exports.bookAdd = async (req, res, next) => {
  try {
    const { name, author, category, info } = req.body
    const newBook = new BooksModel({
      name,
      author,
      category,
      info
    })
    await newBook.save()
    res.status(201).send({
      success: true,
      message: 'new book added',
      newBook
    })
  } catch (error) {
    next(error)
  }
}

module.exports.booksList = async (req, res, next) => {
  const books = await BooksModel.find({}, { name: 1, category: 1, author: 1, info: 1 })
  res.send({
    message: 'success',
    data: {
      books
    }
  })
}
