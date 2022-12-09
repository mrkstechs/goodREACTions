import React from 'react'
import './styles.css'

const Clock = ({timer}) => {
  return (
    <div className="clock">
      <span className="timer">{timer}</span>
    </div>
  )
}

export default Clock