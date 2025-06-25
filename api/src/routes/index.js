const express = require('express')
const router = express.Router()

// Menos simplificado:

// const adminUsers = require('./admin/users')
// const adminCustomers = require('./admin/customers')
// const adminFaqs = require('./admin/faqs')

// router.use('/admin/users', adminUsers)
// router.use('/admin/customers', adminCustomers)
// router.use('/admin/faqs', adminFaqs)

// Así está más simplificado:

router.use('/admin/users', require('./admin/users'))
router.use('/admin/customers', require('./admin/customers'))
router.use('/admin/bots', require('./admin/bots'))
router.use('/admin/faqs', require('./admin/faqs'))

module.exports = router
