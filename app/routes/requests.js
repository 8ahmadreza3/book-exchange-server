const express = require('express')
const router = express.Router()
const requestsController = require('../controllers/requests')

router.get('/', requestsController.listRequests)

module.exports = router
