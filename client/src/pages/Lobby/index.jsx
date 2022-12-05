import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { io } from 'socket.io-client'

import "./style.css"

import { Options, PlayerList } from "./components"

const Lobby = () => {

    const navigate = useNavigate()
    const [lobbyId, setLobbyId] = useState()

    useEffect(() => {
        const socket = io('http://localhost:2333')

        socket.on("connect", () => {
            console.log(`Connected to socket server with client id: ${socket.id}`)
    
            joinLobby(lobbyId, socket);              
        })
    

    }, [])

    function joinLobby(lobbyId, socket) {
        if (!lobbyId) {
            console.log("No lobby specified. Creating new lobby...")
            setLobbyId(socket.id)
        }
        socket.emit('join-lobby', lobbyId, response => {console.log(response)})
    } 


    const options = {
        category: "",
        difficulty: "",
        timer: "",
        maxPlayers: "4"
    }

    
    function startGame(lobbyId, options) {

    }

    function backToHome() {
        navigate('/')
    }

    return <div id="lobby" className="lobbyBackground">
            <h1><span>Lobby Id: {lobbyId}</span></h1>
            <div className="lobbyMain">
                <PlayerList options={options}/>
                <Options />
            </div>
            <div className="lobbyButtons">
                <button onClick={backToHome}>Back</button>
                <button onClick={startGame}>Start Game!</button>
            </div>

        </div>

}

export default Lobby