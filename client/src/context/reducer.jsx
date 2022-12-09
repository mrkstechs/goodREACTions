const reducer = (state, action) => {
    switch(action.type){
        case 'UPDATE_LEADERBOARD':
            return { ...state, leaderboard: action.payload }
        case 'UPADTE_ACTIVE_PLAYERS':
            return { ...state, active_players: action.payload }
        case 'UPDATE_CURRENT_SESSIONS':
            return { ...state, current_sessions: [action.payload] }
        default:
            return state
    }
}

export default reducer