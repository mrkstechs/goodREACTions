import React from "react";
import { io } from 'socket.io-client'

const Lobby = ({ lobbyId }) => {

    const socket = io('http://localhost:2333')
    socket.on("connect", () => {
        console.log(`Connected to socket server with id: ${socket.id}`)
    
        socket.emit('join-lobby', lobbyId, response => {console.log(response)})
    
    })

    

    return <h1>Lobby: {lobbyId}</h1>

}

export default Lobby