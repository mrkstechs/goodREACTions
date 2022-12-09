import React from 'react'
import './styles.css'

import { ReactComponent as FirstPodium } from "./Podiums/First.svg"
import { ReactComponent as SecondPodium } from "./Podiums/Second.svg"
import { ReactComponent as ThirdPodium } from "./Podiums/Third.svg"

const Podium = ({name, position}) => {
  return (
    <div className= {`"podium" ${position === 0 ? 'first' : position === 1 ? 'second' : 'third'}`}>
    <h2>{`${name}`}</h2>
      {
        position === 0 ?  <FirstPodium /> :  position === 1 ? <SecondPodium /> : <ThirdPodium />
      }  
        </div>
    
  )
}

export default Podium

