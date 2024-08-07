const categoriesRouter = require('./categories')
const booksRouter = require('./books')
const authorsRouter = require('./authors')
const usersRouter = require('./users')
const requestsRouter = require('./requests')
const authRouter = require('./auth')
const searchRouter = require('./search')
const uploadRouter = require('./upload')

module.exports = (app) => {
  app.use('/users', usersRouter)
  app.use('/categories', categoriesRouter)
  app.use('/books', booksRouter)
  app.use('/authors', authorsRouter)
  app.use('/requests', requestsRouter)
  app.use('/auth', authRouter)
  app.use('/search', searchRouter)
  app.use('/upload', uploadRouter)
}
