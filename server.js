require('dotenv').config()
require('module-alias/register')
const bootApp = require('./app')
bootApp(process.env.APP_PORT)
