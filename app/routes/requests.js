const express = require('express')
const router = express.Router()
const requestsController = require('../controllers/requests')

router.post('/', requestsController.addRequest)
router.patch('/confirm', requestsController.confirmRequest)
router.patch('./adminConfirm', requestsController.adminConfirmRequest)
router.patch('/send', requestsController.sendRequest)
router.patch('/done', requestsController.doneRequest)
router.delete('/', requestsController.deleteRequest)
router.get('/', requestsController.allRequests)
router.get('/:userName', requestsController.listRequests)

module.exports = router
