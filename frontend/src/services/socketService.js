import io from 'socket.io-client'
import { httpService } from './httpService'




const baseUrl = (process.env.NODE_ENV === 'production') ? '' : '//localhost:3030'
export const socketService = createSocketService()

var socketIsReady = false;

function createSocketService() {
  var socket = null;
  const socketService = {
    async setup() {
      if (socket) return
      // const user=await httpService.get('setup-session')
      socket = io(baseUrl, { reconnection: false })
      socketIsReady = true;
      // socket.emit('user-connected',user._id)
    },
    async on(eventName, cb) {
      if (!socket) await socketService.setup()
      socket.on(eventName, cb)
    },
    async off(eventName, cb = null) {
      if (!socket) await socketService.setup()
      if (!cb) socket.removeAllListeners(eventName)
      else socket.off(eventName, cb)
    },
    async emit(eventName, data) {
      if (!socket) await socketService.setup()
      socket.emit(eventName, data)
    },
    terminate() {
      socket = null
      socketIsReady = false
    }
  }
  return socketService
}






