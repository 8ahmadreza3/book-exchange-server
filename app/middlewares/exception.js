const winston = require('winston')

module.exports = (app) => {
  app.use((error, req, res) => {
    winston.error(error.message, error)
    const status = error.status || 500
    res.send({
      code: 'Exception',
      status,
      message: error.message
    })
  })
}
