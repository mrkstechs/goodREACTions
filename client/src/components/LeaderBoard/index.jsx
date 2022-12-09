import React from 'react'
import './styles.css'

const LeaderBoard = ({users}) => {
  return (
    <ol className="leader-board">
      <h3>Leaderboard</h3>
      {users.map((user, index) => <li key={index}>{user}</li>)}
    </ol>
  )
}

export default LeaderBoard