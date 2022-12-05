import React, { createContext, useContext, useReducer } from 'react'
import reducer from './reducer'

const initalState = {
    leaderboard: [],
    active_players: 0,
    current_sessions: 0
}

const AppStateContext = createContext()

export const AppProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, initalState)
    return (
            <AppStateContext.Provider value={[state, dispatch]}>
                {props.children}
            </AppStateContext.Provider>
    )
}

export const useUpdateAppState = () => useContext(AppStateContext)