const express = require('express')
const router = express.Router()
const requestsController = require('../controllers/requests')

router.post('/', requestsController.addRequest)
router.post('/send/:requestId', requestsController.sendApplicant)
router.patch('/confirm/:applicantId', requestsController.confirmApplicant)
router.patch('/admin/:requestId', requestsController.confirmRequest)
router.patch('/done/:requestId', requestsController.doneRequest)
router.delete('/:requestId', requestsController.deleteRequest)
router.get('/', requestsController.allRequests)
router.get('/:userName', requestsController.listRequests)
router.patch('/:requestId', requestsController.updateRequest)

module.exports = router
