import React, { useEffect, useState, useContext } from 'react'
import { Podium, Stuff } from '../../components'
import RunnerUps from '../../components/RunnerUps'
import AppStateContext  from '../../context'


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
        return sorted.map((user, index) => (
            index <= 2 ? <Podium key={index} name={user.name} position={index}/> : 
            index > 2 && index <= 4 ? <RunnerUps key={index} name={user.name} /> : ''
        ))
    }

    return(
        <>
        <h1>Leaderboard Page!</h1>
        <Stuff/>
        { sorted && topFive(state.leaderboard) }
        </>
    )
}

export default Leaderboardpage
