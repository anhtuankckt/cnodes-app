const express = require('express')
const router = express.Router()
const authRoute = require('./authRoute')
const noteRoute = require('./noteRoute')

router.use('/auth', authRoute)

router.use('/note', noteRoute)

module.exports = router