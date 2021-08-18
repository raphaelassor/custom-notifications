const utilService=require('../services/util.service')
const notifications = [
    {
        id: utilService.makeId(),
        type: 'info',
        message: 'Big sale next week'
    },
    {
        id: utilService.makeId(),
        type: 'info',
        message: 'New auction next month'
    },
    {
        id: utilService.makeId(),
        type: 'warning',
        message: 'Limited edition books for next auction'
    },
    {
        id: utilService.makeId(),
        type: 'error',
        message: 'Last items with limited time offer'
    },
    {
        id: utilService.makeId(),
        type: 'success',
        message: 'New books with limited edition coming next week'
    },

]
module.exports=notifications