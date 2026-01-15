const express = require('express')
const app = express()
const errorHandler = require('./middlewares/error-handler')
const userAgentMiddleware = require('./middlewares/user-agent')
const userTrackingMiddleware = require('./middlewares/user-tracking')
const { createClient } = require('redis')
const exposeServiceMiddleware = require('./middlewares/expose-services')

const redisClient = createClient({ url: process.env.REDIS_URL })
redisClient.connect().catch(console.error)
const subscriberClient = redisClient.duplicate()
subscriberClient.connect().catch(console.error)
require('./events')(redisClient, subscriberClient)

app.use((req, res, next) => {
    req.redisClient = redisClient
    next()
})

const routes = require('./routes')

app.use(express.json({ limit: '10mb', extended: true }))
app.use(userAgentMiddleware)
app.use(userTrackingMiddleware)
app.use(...Object.values(exposeServiceMiddleware))

app.use('/api', routes)
app.use(errorHandler)

module.exports = app

