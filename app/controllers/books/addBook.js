const { BooksModel } = require('../../models/booksModel')
const AuthorModel = require('../../models/authorsModel')

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
    const bookAuthor = await AuthorModel.find({ name: author })
    console.log(bookAuthor)
    bookAuthor.books.push(newBook._id)
    await bookAuthor.save()
    res.status(201).send({
      success: true,
      message: 'new book added',
      newBook
    })
  } catch (error) {
    next(error)
  }
}
