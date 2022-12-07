import React, { useEffect, useState, useContext } from 'react'
import { Podium, RunnerUps } from '../../components'
import AppStateContext  from '../../context'
import './styles.css'

const Leaderboardpage = () =>{
    const useUpdateAppState = () => useContext(AppStateContext)
    const [state, setState ] = useUpdateAppState()
    const [sorted, setSorted] = useState(false)

    useEffect(() => { 
        if(state.leaderboard.length !== 0){
            setSorted(true)
        }
    }, [state, sorted])
    
    const topFive = (arr) => {
        const sorted = arr.sort((a, b) => b.score - a.score)
        return (
            <div className='leaderboard'>
                <div className="stage">
                    {sorted.map((user, index) => ( index <= 2 && <Podium key={index} name={user.name} position={index}/> ))}
                </div>
                <div className="bench">
                    {sorted.map((user,index) => ( index > 2 && index <= 4 ? <RunnerUps key={index} name={user.name} /> : '' ))}
                </div>
            </div>
        )
    }

    return(
        <>
        { sorted && topFive(state.leaderboard) }
        </>
    )
}

export default Leaderboardpage
