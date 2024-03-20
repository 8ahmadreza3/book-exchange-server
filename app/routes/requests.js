const express = require('express')
const router = express.Router()
const requestsController = require('../controllers/requests')

router.post('/', requestsController.addRequest)
router.patch('/confirm', requestsController.confirmRequest)
router.patch('/admin', requestsController.adminConfirmRequest)
router.patch('/send', requestsController.sendRequest)
router.patch('/done/:requestId', requestsController.doneRequest)
router.delete('/:requestId', requestsController.deleteRequest)
router.get('/', requestsController.allRequests)
router.get('/:userName', requestsController.listRequests)
router.patch('/', requestsController.updateRequest)

module.exports = router
