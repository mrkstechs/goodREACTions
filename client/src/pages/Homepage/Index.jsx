import React, {  useEffect  } from 'react'
import { useNavigate } from 'react-router-dom'

const Homepage = () =>{
    const navigate = useNavigate()

    function toLobby(){
        navigate('/lobby')
    }

    function toLeaderboard(){
        navigate('/leaderboard')
    }

    return (
        <>
        <div className='background'>
            {/* logo component */}
            <div id='homebtns'>
                <button onClick = {toLobby}>Create Lobby</button>
                <button>Join Lobby</button>
                <button onClick = {toLeaderboard}>Leaderboard</button>
            </div>
        </div>
        </>
    )
}

export default Homepage
