const categoriesRouter = require('./categories')
const allBooksRouter = require('./allBooks')

module.exports = (app) => {
  app.use('/categories', categoriesRouter)
  app.use('/books', allBooksRouter)
}
