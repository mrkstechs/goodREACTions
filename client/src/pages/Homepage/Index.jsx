import React, {  useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Popup from 'reactjs-popup'

const Homepage = () =>{
    

    const navigate = useNavigate()

    // function toLobby(){
    //     navigate('/lobby')
    // }

    function toLeaderboard(){
        navigate('/leaderboard')
    }

    // function createGame(){
        //store username and lobbyid, create new 'session'.
    // }

    // function joinGame(){
    //     // if game id = input value, send to lobby, else, error message.
    // }

    return (
        <>
      
        <div className='background'>
            {/* logo component */}
            <div id='homebtns'>
                <Popup trigger={<button>Create Lobby</button>}>
                    <div className='popupForm'>
                        <h2>Create Lobby</h2>
                        <form id='popupCreate'>
                            <label htmlFor="username">User Name:</label>
                            <input type="text" name='username' placeholder='Enter Lobby name here...' className='txt'/>
                            <label htmlFor="lobby">Lobby Name:</label>
                            <input type="text" name='lobby' placeholder='Enter Lobby name here...' className='txt'/>
                            <input type="button" value="Enter" className='enter'/>
                        </form>
                    </div>
                </Popup>

                <Popup trigger={<button>Join Lobby</button>}>
                    <div className='popupForm'>
                        <h2>Join Lobby</h2>
                        <form id='popupJoin'>
                            <label htmlFor="username">User Name:</label>
                            <input type="text" name='username' placeholder='Enter Lobby name here...' className='txt'/>
                            <label htmlFor="lobby">Lobby Name:</label>
                            <input type="text" name='lobby' placeholder='Enter Lobby name here...' className='txt'/>
                            <input type="button" value="Enter" className='enter'/>
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
