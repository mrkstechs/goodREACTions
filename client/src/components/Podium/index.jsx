import React from 'react'
import './styles.css'

const Podium = ({name, position}) => {
  return (
    <div className={`podium`}>
        <h2>{`${name} & ${position}`}</h2>
    </div>
  )
}

export default Podium