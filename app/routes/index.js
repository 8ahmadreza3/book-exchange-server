const categoriesRouter = require('./categories')
const allBooksRouter = require('./allBooks')
const authorsRouter = require('./authors')

module.exports = (app) => {
  app.use('/categories', categoriesRouter)
  app.use('/books', allBooksRouter)
  app.use('/authors', authorsRouter)
}
