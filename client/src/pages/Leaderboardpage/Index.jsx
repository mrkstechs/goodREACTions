import React, { useEffect, useState } from 'react'
import { useUpdateAppState } from '../../context'
const Leaderboardpage = () =>{
    const [state, setState ] = useUpdateAppState()
    return(
        <>
        <h1>Leaderboard page</h1>
        {state.leaderboard.map((user, index) => <p key={index}>{`User: ${user.name}, Score: ${user.score}`}</p>)}
        </>
    )
}

export default Leaderboardpage
