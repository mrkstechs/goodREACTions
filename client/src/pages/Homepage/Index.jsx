import React, {  useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Popup from 'reactjs-popup'

import { socket } from "../../App";

const Homepage = () =>{
    
    const [lobbyId, setLobbyId] = useState("")
    const [username, setUsername] = useState("")

    socket.on("connect", () => {
        console.log(`Connected to socket server with client id: ${socket.id}`)
    })

    socket.on("console-message", (message) => {
        console.log(message)
    })

    //Navigation

    const navigate = useNavigate()

    function toLeaderboard(){
        navigate('/leaderboard')
    }

    socket.on("send-to-lobby", ( lobbyId, username, userList, host) => {
        console.log("userList:", userList)
        console.log('host: ', host)
        navigate('/lobby', {state: { lobbyId, username, userList, host}})
    })


    // Creating / Joining lobbies

    function createGame(e) {
        // store username and lobbyid, create new 'session'.
        e.preventDefault()
        socket.emit('create-lobby', lobbyId, username)
    }

    function joinGame(e){
        e.preventDefault()
        socket.emit('join-lobby', lobbyId, username)
    }

    // Form handling

    function updateUsername(e) {
        setUsername(e.target.value)
    }

    function updateLobbyId(e) {
        setLobbyId(e.target.value)
    }

    return (
        <>
      
        <div className='background'>
            {/* logo component */}
            <div id='homebtns'>
                <Popup trigger={<button>Create Lobby</button>}>
                    <div className='popupForm'>
                        <h2>Create Lobby</h2>
                        <form id='popupCreate' onSubmit={createGame}>
                            <label htmlFor="username">User Name:</label>
                            <input type="text" name='username' placeholder='Enter Lobby name here...' className='txt' onChange={updateUsername} value={username} required/>
                            <label htmlFor="lobby">Lobby Name:</label>
                            <input type="text" name='lobby' placeholder='Enter Lobby name here...' className='txt' onChange={updateLobbyId} value={lobbyId} required/>
                            <input type="submit" value="Enter" className='enter'/>
                        </form>
                    </div>
                </Popup>

                <Popup trigger={<button>Join Lobby</button>}>
                    <div className='popupForm'>
                        <h2>Join Lobby</h2>
                        <form id='popupJoin' onSubmit={joinGame}>
                            <label htmlFor="username">User Name:</label>
                            <input type="text" name='username' placeholder='Enter Lobby name here...' className='txt' onChange={updateUsername} required/>
                            <label htmlFor="lobby">Lobby Name:</label>
                            <input type="text" name='lobby' placeholder='Enter Lobby name here...' className='txt' onChange={updateLobbyId} required/>
                            <input type="submit" value="Enter" className='enter'/>
                        </form>
                    </div>
                </Popup>
                <button onClick = {toLeaderboard}>Leaderboard</button>
            </div>
        </div>

        </>
    )
}

export default Homepage
