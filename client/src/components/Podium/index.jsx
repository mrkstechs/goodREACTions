import React from 'react'

const Podium = ({name, position}) => {
  return (
    <div className={`podium`}>
        <h2>{`${name} & ${position}`}</h2>
    </div>
  )
}

export default Podium