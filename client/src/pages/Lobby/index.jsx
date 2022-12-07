import React from "react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom'

import { socket } from "../Homepage/Index";

import "./style.css"

import { Options, PlayerList } from "./components"

const Lobby = () => {

    const { state } = useLocation()
    const { lobbyId, username, userList } = state

    console.log("userList:", userList)

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


    // Navigation
    const navigate = useNavigate()
    
    function startGame() {
        socket.emit("start-gamme", lobbyId, options, toQuestionPage)
    }

    function toQuestionPage() {
        navigate('/question')
    }

    function backToHome() {
        navigate('/')
    }

    return <div id="lobby" className="lobbyBackground">
            <h1><span role="heading" aria-label="lobbyHeading">Lobby Id: {lobbyId}</span></h1>
            <div className="lobbyMain">
                <PlayerList lobbyId={lobbyId} options={options} initUserList={userList}/>
                <Options category={category} difficulty={difficulty} timer={timer} maxPlayers={maxPlayers} numQuestions={numQuestions} updateCategory={updateCategory} updateDifficulty={updateDifficulty} updateTimer={updateTimer} updateMaxPlayers={updateMaxPlayers} updateNumQuestions={updateNumQuestions}/>
            </div>
            <div className="lobbyButtons">
                <button onClick={backToHome} name="backButton">Back</button>
                <button onClick={startGame} name="startButton">Start Game!</button>
            </div>

        </div>

}

export default Lobby