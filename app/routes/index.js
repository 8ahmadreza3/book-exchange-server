const categoriesRouter = require('./categories')
const allBooksRouter = require('./allBooks')
module.exports = (app) => {
  app.use('/categories', categoriesRouter)
  app.use('/all_books', allBooksRouter)
}
