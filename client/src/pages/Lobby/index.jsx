import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { io } from 'socket.io-client'

import "./style.css"

import { Options, PlayerList } from "./components"

const Lobby = ({socket, lobbyId, username }) => {

    const [category, updateCategory] = useState("any")
    const [difficulty, updateDifficulty] = useState("any")
    const [timer, updateTimer] = useState("20")
    const [maxPlayers, updateMaxPlayers] = useState("4")
    const [numQuestions, updateNumQuestions] = useState("10")

    let options = {
        category: "",
        difficulty: "",
        timer: "",
        maxPlayers: "4",
        numQuestions: "10"
    }

    useEffect(() => {
        options = {
            category: category,
            difficulty: difficulty,
            timer: timer,
            maxPlayers: maxPlayers,
            numQuestions: numQuestions
        }
    }, [category, difficulty, timer, maxPlayers, numQuestions])

    const navigate = useNavigate()

    useEffect(() => {
        
    }, [])



    // function joinLobby(lobbyId, socket) {
    //     if (!lobbyId) {
    //         console.log("No lobby specified. Creating new lobby...")
    //         setLobbyId(socket.id)
    //     }
    //     socket.emit('join-lobby', lobbyId, displayConsoleMessage)
    // } 



    
    function startGame(lobbyId, options) {
        navigate('/question', {lobbyId, options})
    }

    function backToHome() {
        navigate('/')
    }

    return <div id="lobby" className="lobbyBackground">
            <h1><span>Lobby Id: {lobbyId}</span></h1>
            <div className="lobbyMain">
                <PlayerList options={options}/>
                <Options category={category} difficulty={difficulty} timer={timer} maxPlayers={maxPlayers} numQuestions={numQuestions} updateCategory={updateCategory} updateDifficulty={updateDifficulty} updateTimer={updateTimer} updateMaxPlayers={updateMaxPlayers} updateNumQuestions={updateNumQuestions}/>
            </div>
            <div className="lobbyButtons">
                <button onClick={backToHome}>Back</button>
                <button onClick={startGame}>Start Game!</button>
            </div>

        </div>

}

export default Lobby