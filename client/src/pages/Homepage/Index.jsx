import React from 'react'
import { NavBar } from '../../components'
import { io } from 'socket.io-client'

const Homepage = () =>{

    const socket = io('http://localhost:2333')


    return (
        <>
        < NavBar/>
        <div className='background'>
            {/* logo component */}
            <div id='homebtns'>
                <button>Create Lobby</button>
                <button>Join Lobby</button>
                <button>Leaderboard</button>
            </div>
        </div>
        </>
    )
}

export default Homepage
