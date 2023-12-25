const notFound = require('../controllers/404')

module.exports = (app) => {
  app.use(notFound)
}
