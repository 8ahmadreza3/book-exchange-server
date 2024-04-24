const express = require('express')
const router = express.Router()
const requestsController = require('../controllers/requests')
const authAdmin = require('../middlewares/authAdmin')
const authUser = require('../middlewares/authUser')

router.post('/', [authUser], requestsController.addRequest)
router.post('/send/:requestId', [authUser], requestsController.sendApplicant)
router.patch('/confirm/:applicantId', [authUser], requestsController.confirmApplicant)
router.patch('/admin/:requestId', [authAdmin], requestsController.confirmRequest)
router.patch('/done/:requestId', [authUser], requestsController.doneRequest)
router.delete('/:requestId', [authAdmin], requestsController.deleteRequest)
router.get('/', [authAdmin], requestsController.allRequests)
router.get('/:userName', [authUser], requestsController.listRequests)
router.patch('/:requestId', [authUser], requestsController.updateRequest)

module.exports = router
