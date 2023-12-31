const express = require('express')
const router = express.Router()
const requestsController = require('../controllers/requests')

router.post('/', requestsController.addRequest)
router.patch('/:id', requestsController.sendRequest)
router.get('/all', requestsController.allRequests)
router.get('/:userName', requestsController.listRequests)

module.exports = router
