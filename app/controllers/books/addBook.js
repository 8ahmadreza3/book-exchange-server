const BooksModel = require('../../models/booksModel')

module.exports = async (req, res, next) => {
  try {
    const { name, author, category, info, address } = req.body
    const newBook = new BooksModel({
      name,
      author,
      category,
      info,
      address
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
