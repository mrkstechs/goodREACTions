import React from 'react'
import './styles.css'

const Podium = ({name, position}) => {
  return (
    <div className={`podium ${position === 0 ? 'first' : position === 1 ? 'second' : 'third'}`}>
        <h2>{`${name} & ${position}`}</h2>
    </div>
  )
}

export default Podium
