
var gIo = null
var gSocketBySessionIdMap = {}

function connectSockets(http, session) {
    gIo = require('socket.io')(http);
    
    const sharedSession = require('express-socket.io-session');
   const notificationController=require('../api/notification/notification.controller')

    gIo.use(sharedSession(session, {
        autoSave: true
    }));
    
    gIo.on('connection', socket => {
        console.log('New socket - socket.handshake.sessionID', socket.handshake.sessionID)
        gSocketBySessionIdMap[socket.handshake.sessionID] = socket
        socket.on('disconnect', socket => {
            console.log('Someone disconnected')
            if (socket.handshake) {
                gSocketBySessionIdMap[socket.handshake.sessionID] = null
            }
        })
        socket.on('user connected', userId => {
            socket.join(userId)
            notificationController.initNotificationSend(userId)
        })

    })
}

function emitToUser({ type, data, userId }) {
    gIo.to(userId).emit(type, data)
}


module.exports = {
    connectSockets,
    emitToUser,
}



