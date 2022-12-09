import React, { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { socket } from '../../App'
import { Answer, Clock, LeaderBoard, QuestionCounter } from '../../components'
import { useUpdateAppState } from '../../context'

import './styles.css'

const Questionspage = () => {
  const location = useLocation()
  const [gameState, updateGameState] = useUpdateAppState()
  const questionRef = useRef()
  const gameSettings = location.state
  const [currentGameState, setCurrentGameState] = useState({
    current_player: null,
    players: null,
    question_number: 1,
    question: '',
    answers: false,
    correct_answer: null,
    max_questions: 10,
    timer: gameSettings.timer,
    scores: null
  })
  

  useEffect(() => {
    if(!gameState.current_sessions && !currentGameState.answers){
      
      
    }
    
    // if(currentGameState.answers){
      //   const payload = {
    //     host: gameSettings.host,
    //     settings: gameSettings,
    //     current: currentGameState
    //   }
    //   updateGameState({type: 'UPDATE_CURRENT_SESSIONS', payload: payload })
    // }
    
    console.log('Game State: ',gameState)
    console.log('Current Game State: ',currentGameState)

    if (questionRef.current) questionRef.current.innerHTML = currentGameState.question

  }, [questionRef, gameState, gameSettings, currentGameState])

  
      socket.on('send-question', (question, activeplayer, players) => {
        socket.on('send-answers', (shuffledAnswers, correctAnswer) => {
          setCurrentGameState({
            current_player: activeplayer,
            players,
            question_number: currentGameState.question_number,
            question,
            answers: shuffledAnswers,
            correct_answer: correctAnswer,
            max_questions: currentGameState.max_questions,
            timer: currentGameState.timer,
            scores: currentGameState.scores
          })
        })
      })
  return (
    <div id="game">
        {!currentGameState.answers ? <p>Loading....</p> 
          : (
              <>
              <div className="triva-stage">
                <LeaderBoard users={currentGameState.players}/>
                <Clock timer={currentGameState.timer}/>
              </div>
              <div className="question-section">
                <div className="current-question">
                  <span className="round-section"><QuestionCounter current={currentGameState.question_number} final={currentGameState.max_questions}/></span>
                  <p ref={questionRef}>Question</p>
                </div>
                <div className="answer-section">
                  {
                    currentGameState.answers.map(answer => <Answer correct={currentGameState.correct_answer} text={answer} />)
                  }
                </div>
              </div>
              </>
          )}
    </div>
  )
}

export default Questionspage