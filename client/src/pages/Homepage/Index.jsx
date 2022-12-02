import React from 'react'
import { NavBar } from '../../components'

const Homepage = () =>{
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
