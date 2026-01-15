const express = require('express')
const router = express.Router()
const controller = require('../../controllers/auth/auth-activate-controller.js')
const AuthorizationService = require('../../services/authorization-service.js')

router.use((req, res, next) => {
    req.authorizationService = new AuthorizationService()
    next()
})

router.post('/activate', controller.activate)
router.post('/reset', controller.reset)

module.exports = router
