import React, { useRef, useEffect, useState } from 'react'
import './styles.css'

const Answer = ({correct, text, disable, trigger=null}) => {
    const [isCorrect, setIsCorrect] = useState(trigger)
    const answerRef = useRef()
  
    useEffect(() => {
        answerRef.current.innerHTML = text
    }, [answerRef, correct, disable, text, isCorrect])
  
    const handler = (e) => {
        e.target.textContent == correct ? setIsCorrect(true) : setIsCorrect(false)
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