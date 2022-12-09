import React, { useReducer } from 'react'
import reducer from './reducer'
import AppStateContext from '.'

const initalState = {
    leaderboard: [],
    active_players: 0,
    current_sessions: null
}

const AppProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, initalState)

    return (
            <AppStateContext.Provider value={[state, dispatch]}>
                {props.children}
            </AppStateContext.Provider>
    )
}

export default AppProvider