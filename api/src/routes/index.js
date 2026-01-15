const express = require('express')
const router = express.Router()

router.use('/admin/users', require('./admin/users'))
router.use('/admin/customers', require('./admin/customers'))
router.use('/admin/bots', require('./admin/bots'))
router.use('/admin/faqs', require('./admin/faqs'))
router.use('/admin/event-categories', require('./admin/event-categories'))
router.use('/admin/promoters', require('./admin/promoters'))
router.use('/admin/spots', require('./admin/spots'))
router.use('/admin/images', require('./admin/images'))
router.use('/admin/languages', require('./admin/languages'))
router.use('/customer/customers', require('./customer/customers'))
router.use('/auth', require('./auth/auth-activates'))

module.exports = router
