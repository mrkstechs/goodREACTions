import React, { useRef, useEffect, useState } from 'react'
import { useUpdateAppState } from '../../context'
import './styles.css'

const Answer = ({correct, text, disable, callback, trigger=null}) => {
    const [isCorrect, setIsCorrect] = useState(trigger)
    const [answered, setAnswered] = useState(false)
    const answerRef = useRef()
  
    useEffect(() => {
        answerRef.current.innerHTML = text
        !answered && setIsCorrect(null)
    }, [answerRef, correct, disable, text, isCorrect, answered])
  
    const handler = (e) => {
        callback(e.target.textContent)
        if(e.target.textContent == correct){
            setIsCorrect(true)
        } else {
            setIsCorrect(false)
        }
        setAnswered(!answered)
    }
  
    return (
    <div className={`answer-tile ${
        isCorrect === true ? 'correct' : 
        isCorrect === false ? 'incorrect' : '' 
    }`}>
        <p ref={answerRef} onClick={handler}></p>
    </div>
  )
}

export default Answer