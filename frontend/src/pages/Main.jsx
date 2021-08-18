import { useEffect, useState } from "react"
import { notificationService } from "../services/notificationService"
import { socketService } from '../services/socketService'
import { UserNotification } from '../cmps/UserNotification'
import { userService } from "../services/userService"
import {ErrorModal} from '../cmps/ErrorModal'

export const Main = () => {

  const [currNotific, setNotific] = useState(null)
  const [errorMsg,setError]=useState(null)


  useEffect(() => {
    const connect = async () => {
      try{
        await socketService.setup()
        const user = await userService.setupSession()
        socketService.emit('user connected', user._id)
        socketService.on('send notification', data => {
          setNotific(data.notific)
          setTimeout(() => {
            setNotific(null)
          }, data.duration)
        })
      }catch(err){
        setError('had issues connecting to server')
      }
    }
    connect()
    return ()=>{
      socketService.terminate()
    }
  }, [])

  const handleClick = async () => {
    setNotific(null)
    await notificationService.addNotification(currNotific)
  }

  const unsetError=()=>{
    setError(null)
  }

  return <section>
    {currNotific && <UserNotification notific={currNotific} handleClick={handleClick} />}
    {errorMsg&& <ErrorModal unsetError={unsetError} error={errorMsg}/>}
  </section>
}


