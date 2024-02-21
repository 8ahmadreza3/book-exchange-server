const categoriesRouter = require('./categories')
const booksRouter = require('./books')
const authorsRouter = require('./authors')
const usersRouter = require('./users')
const requestsRouter = require('./requests')
const authSMSRouter = require('./authSMS')
const searchRouter = require('./search')

module.exports = (app) => {
  app.use('/users', usersRouter)
  app.use('/categories', categoriesRouter)
  app.use('/books', booksRouter)
  app.use('/authors', authorsRouter)
  app.use('/requests', requestsRouter)
  app.use('/sms', authSMSRouter)
  app.use('/search', searchRouter)
}
