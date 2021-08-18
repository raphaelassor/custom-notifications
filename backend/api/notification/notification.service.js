
const userService = require('../user/user.service')
const utilService = require('../../services/util.service')
const socketService = require('../../services/socket.service')
const notificationPool = require('../../data/notifications')

async function addNotificationInUser(notific, userId) {
    await userService.addNotificationId(notific.id, userId)
}

function getEligibleNotifications(user) {
    const eligibleNotifics = notificationPool.filter(notific => !user.confirmedNotificIds.includes(notific.id))
    return eligibleNotifics
}

function getRandomNotification(notifications) {
    const random = utilService.getRandomInt(0, notifications.length)
    const notific = { ...notifications[random] }
    return notific
}

function sendNotificationToUser(notific, userId) {
    const duration = utilService.getRandomInt(1000, 4000)
    const emit = {
        type: 'send notification',
        data: { notific, duration },
        userId
    }
    socketService.emitToUser(emit)
}

function modifyMessage(message) {

    if (message.match(/sale/i)) message += '!'
    if (message.match(/new/i)) {
        message = '~~ ' + message
    }
    if (message.match(/limited edition/i)) {
        message = message.replace(/limited edition/i, 'LIMITED EDITION')
    }
    return message
}

function getFinishNotification() {
    return {
        id: utilService.makeId(),
        type: 'finish',
        message: 'You have clicked on all the notifications!',
    }
}
module.exports = {
    addNotificationInUser,
    getEligibleNotifications,
    modifyMessage,
    sendNotificationToUser,
    getRandomNotification,
    getFinishNotification,
}