import { httpService } from './httpService.js'
export const notificationService = {
    addNotification
}

async function addNotification(notific) {
    try {
       return await httpService.post('notification', notific)
    } catch (e) {
        console.log('error posting notification from server')
    }
}