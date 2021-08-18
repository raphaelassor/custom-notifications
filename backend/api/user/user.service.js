
const User = require('../../db/models/user')

async function createUser() {
    const user = new User({
        confirmedNotificIds: []
    })
    await user.save()
    return user
}

async function getUserById(userId){
    return await User.findById(userId)
}

async function addNotificationId(notificationId,userId){
    const user = await getUserById(userId)
    user.confirmedNotificIds.push(notificationId)
    await user.save()
}

module.exports={
    createUser,
    getUserById,
    addNotificationId
}