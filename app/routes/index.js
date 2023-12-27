const categoriesRouter = require('./categories')
const allBooksRouter = require('./allBooks')
const authorsRouter = require('./authors')
const usersRouter = require('./users')

module.exports = (app) => {
  app.use('/user', usersRouter)
  app.use('/categories', categoriesRouter)
  app.use('/books', allBooksRouter)
  app.use('/authors', authorsRouter)
}
