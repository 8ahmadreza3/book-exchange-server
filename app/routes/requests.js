const express = require('express')
const router = express.Router()
const requestsController = require('../controllers/requests')

router.get('/all', requestsController.allRequests)
router.get('/:userName', requestsController.listRequests)

module.exports = router
