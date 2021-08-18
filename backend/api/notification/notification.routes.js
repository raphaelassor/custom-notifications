const express = require('express')
const {addNotification} = require('./notification.controller')
const router = express.Router()


router.post('/', addNotification)

module.exports = router