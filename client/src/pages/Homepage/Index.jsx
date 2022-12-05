import React, {  useEffect, useState  } from 'react'
import { useNavigate } from 'react-router-dom'
import Popup from 'reactjs-popup'

const Homepage = () =>{
    const [active, setActive] = useState(false)

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
                <Popup trigger={<button>Join Lobby</button>}>
                    <div id='popupForm'>
                        <form>
                            <label htmlFor="lobby">Lobby Name:</label>
                            <input type="text" name='lobby' placeholder='Enter Lobby name here...' id='txt'/>
                            <input type="button" value="Enter" id='enter'/>
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
