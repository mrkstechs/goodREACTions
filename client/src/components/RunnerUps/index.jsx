import React from 'react'
import "./styles.css"

const RunnerUps = ({name}) => {
  return (
    <div id='losers'>{`Runner Up: ${name}`}</div>
  )
}
export default RunnerUps
