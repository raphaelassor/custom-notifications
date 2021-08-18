
const socketService = require('../../services/socket.service')
const utilService = require('../../services/util.service')
const notificationService = require('./notification.service')
const userService = require('../user/user.service')
const logger = require('../../services/logger.service')
let skipped = false



async function addNotification(req, res) {
    try {
        const notific = req.body
        await notificationService.addNotificationInUser(notific, req.session.user._id)
        skipped = true
        res.send()
    } catch (e) {
        handleError('could not submit notificatin')
    }
}

async function initNotificationSend(userId) {
    let notifications;
    while (true) {
        await utilService.delay(utilService.getRandomInt(5000, 10000))
        const user = await userService.getUserById(userId)
        notifications = notificationService.getEligibleNotifications(user)
        if (!notifications.length) break
        if (!skipped) {
            const notific = notificationService.getRandomNotification(notifications)
            notific.message = notificationService.modifyMessage(notific.message)
            notificationService.sendNotificationToUser(notific, userId)
        }
        else skipped = false
    }
    const notific=notificationService.getFinishNotification()
    notificationService.sendNotificationToUser(notific, userId)
}



function handleError(res, err, msg) {
    logger.error(msg, err)
    res.status(500).send({ err, msg })
}



module.exports = {
    addNotification,
    initNotificationSend
}