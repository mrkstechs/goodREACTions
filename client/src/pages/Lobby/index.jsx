import React from "react";
import { io } from 'socket.io-client'

const Lobby = ({ lobbyId }) => {



    const socket = io('http://localhost:2333')
    socket.on("connect", () => {
        console.log(`Connected to socket server with client id: ${socket.id}`)

        if (!lobbyId) {
            console.log("No lobby specified. Creating new lobby...")
            lobbyId = socket.id
        }

        socket.emit('join-lobby', lobbyId, response => {console.log(response)})
    
    })

    
    function startGame() {
        
    }


    return <div id="lobby">
            <h1>Lobby: {lobbyId}</h1>
            <button onClick={startGame()}>Start Game!</button>
        </div>

}

export default Lobby