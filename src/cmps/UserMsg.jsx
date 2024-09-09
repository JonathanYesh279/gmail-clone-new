import { useEffect, useState } from "react"
import { eventBusService } from './../service/eventBus.service';

import xIcon from '../assets/imgs/xIcon.png'

export function UserMsg() { 
  const [msg, setMsg] = useState(null)

  useEffect(() => {
    const unsubscribe = eventBusService.on('show-user-msg', (msg) => {
      setMsg(msg)
      setTimeout(() => { 
        setMsg(null)
      }, 5000)
    })

    return () => unsubscribe()
  }, [])


  function onCloseMsg() {
    setMsg(null)
  }

  if (!msg) return <></>

  return (
    <div className={`user-msg  ${msg.type}`}>
      <h4>{msg.txt}</h4>
      <button onClick={onCloseMsg} className="close-btn">
        <img src={xIcon} alt="close" />
      </button>
    </div>
  )
}