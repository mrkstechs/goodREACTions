import React from "react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom'

import { socket } from "../../App";

import "./style.css"

import { Options, PlayerList } from "./components"
import { useUpdateAppState } from "../../context";

const Lobby = () => {

    const { state } = useLocation()
    const { lobbyId, username, userList, host } = state
    // const [gameState, updateGameState] = useUpdateAppState()
    const [gameSettings, setGameSettings] = useState({
        host: null,
        category: "any",
        difficulty: "any",
        timer: "20",
        maxPlayers: "4",
        numQuestions: "10"
    })

    useEffect(() => {
        console.log(gameSettings)
    })
    // Navigation
    const navigate = useNavigate()
    
    function startGame() {
        console.log(socket)
        socket.emit("start-game", lobbyId, gameSettings)
    }

    socket.on("game-starting", (questionData) => {
        console.log("Starting game...")
        socket.emit("init-game", lobbyId)

        navigate('/question', {state: {questionData}})
    })

    function backToHome() {
        navigate('/')
    }

    return <div id="lobby" className="lobbyBackground">
            <h1><span role="heading" aria-label="lobbyHeading">Lobby Id: {lobbyId}</span></h1>
            <div className="lobbyMain">
                <PlayerList lobbyId={lobbyId} options={gameSettings} initUserList={userList}/>
                <Options config={gameSettings} update={setGameSettings}/>
            </div>
            <div className="lobbyButtons">
                <button onClick={backToHome} name="backButton">Back</button>
                <button onClick={startGame} name="startButton">Start Game!</button>
            </div>

        </div>

}

export default Lobby