import React from 'react'
import './styles.css'

const QuestionsCounter = ({current, final}) => {
  return (
    <div className="counter">
      <span className="current-round">{current}</span>
      <span className='slash'>/</span>
      <span className="final-round">{final}</span>
    </div>
  )
}

export default QuestionsCounter