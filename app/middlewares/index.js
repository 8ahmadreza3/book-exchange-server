const bodyParser = require('body-parser')
const cors = require('cors')
const fileUpload = require('express-fileupload')

module.exports = (app) => {
  app.use(cors())
  app.use(bodyParser.json())
  app.use(fileUpload({
    createParentPath: true,
    useTempFile: true
  }))
}
