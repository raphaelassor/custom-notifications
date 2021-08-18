// import { storageService } from './asyncStorageService'
import { httpService } from './httpService'


export const userService = {
    setupSession
}

async function setupSession(){
    try{
        const user=await httpService.get('setup-session')
        return user 
    }catch(err){
        console.log('error with server session setup',err)
        throw Error('Could not connect to server')
    }
}

