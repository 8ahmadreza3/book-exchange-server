const categoriesRouter = require('./categories')
module.exports = (app) => {
  app.use('/categories', categoriesRouter)
}
