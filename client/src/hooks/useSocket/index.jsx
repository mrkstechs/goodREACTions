import { useState, useEffect } from "react";
import { io } from 'socket.io-client'

function useSocket() {
    const [currentSocket, setCurrentSocket] = useState(null)
     useEffect(() => {
         const socket = io('http://localhost:2333')
        if(!currentSocket){
            setCurrentSocket(socket)
        }

     })
   
     return currentSocket 
}

export default useSocket