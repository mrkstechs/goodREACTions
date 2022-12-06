import React, { useEffect, useState } from 'react'
import { Podium } from '../../components'
import RunnerUps from '../../components/RunnerUps'
import { useUpdateAppState } from '../../context'

const Leaderboardpage = () =>{
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
            index <= 2 ? <Podium key={index} name={user.name}/> : 
            index > 2 && index <= 4 ? <RunnerUps key={index} name={user.name} /> : ''
        ))
    }

    return(
        <>
        <h1>Leaderboard Page</h1>
        { sorted && topFive(state.leaderboard) }
        </>
    )
}

export default Leaderboardpage
