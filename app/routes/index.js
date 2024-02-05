const categoriesRouter = require('./categories')
const allBooksRouter = require('./Books')
const authorsRouter = require('./authors')
const usersRouter = require('./users')
const requestsRouter = require('./requests')
const authSMS = require('../controllers/authSMS')

module.exports = (app) => {
  app.use('/users', usersRouter)
  app.use('/categories', categoriesRouter)
  app.use('/books', allBooksRouter)
  app.use('/authors', authorsRouter)
  app.use('/requests', requestsRouter)
  app.get('/sms/:number', authSMS)
}
