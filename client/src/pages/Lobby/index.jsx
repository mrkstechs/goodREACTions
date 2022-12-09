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
    const [gameSettings, setGameSettings] = useState({
        host: false,
        category: "any",
        difficulty: "any",
        timer: "20",
        currentPlayers: null,
        maxPlayers: "4",
        numQuestions: "10"
    })
    const [gameState, updateGameState] = useUpdateAppState()
    const [started, setStarted] = useState(false)

    useEffect(() => {
        !gameSettings.host && setGameSettings({ ...gameSettings, host: host })
        !gameSettings.currentPlayers && setGameSettings({ ...gameSettings, currentPlayers: userList })
        started && navigate('/question')
    }, [gameSettings.host, gameSettings.currentPlayers, started])
    // Navigation
    const navigate = useNavigate()
    
    function startGame() {
        console.log(socket)
        socket.emit("start-game", lobbyId, gameSettings)
    }

    socket.on("game-starting", (questionData) => {
        console.log("Starting game...")
        socket.emit("init-game", lobbyId)

        if(gameSettings.host && gameSettings.currentPlayers){
            const payload = {
                host: gameSettings.host,
                settings: gameSettings,
                current: null,
                status: 'started'
            }

            updateGameState({type: 'UPDATE_CURRENT_SESSIONS', payload: payload })
            setStarted(true)
        }
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