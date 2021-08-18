const express = require('express')
const session = require('./session')
require('../db/mongoose')
const app = express()

app.use(express.json())
app.use(session)

const path = require('path')
const cors = require('cors')

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')))
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3000', 'http://localhost:3000'],
        credentials: true
    }
    app.use(cors(corsOptions))
}


const userService = require('../api/user/user.service')
app.get('/api/setup-session', async (req, res) => {
    const user= await userService.createUser()
    req.session.user=user
    res.send(user)
})


const notificRoutes = require('../api/notification/notification.routes')
app.use('/api/notification', notificRoutes)

app.get('/**', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'))
})

module.exports = app