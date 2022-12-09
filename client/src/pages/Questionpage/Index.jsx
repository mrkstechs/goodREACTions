import React, { useState, useEffect, useRef } from 'react'
import { socket } from '../../App'
import { Answer, Clock, LeaderBoard, Player, QuestionCounter } from '../../components'
import { useUpdateAppState } from '../../context'

import './styles.css'

const Questionspage = () => {
  const [gameState, updateGameState] = useUpdateAppState()
  const questionRef = useRef()
  const [currentGameState, setCurrentGameState] = useState({
    current_player: null,
    players: null,
    question_number: 1,
    question: '',
    answers: null,
    correct_answer: null,
    player_answer: null,
    max_questions: parseInt(gameState.current_sessions[0].settings.numQuestions),
    timer: parseInt(gameState.current_sessions[0].settings.timer),
    scores: null
  })
  const [playerAnswer, setPlayerAnswer] = useState(null)
  const [answerChecked, setAnswerChecked] = useState(null)
  

  useEffect(() => {
    console.log('Game State: ',gameState)
    console.log('Current Game State: ',currentGameState)
    console.log('player answer: ', playerAnswer)
    if (playerAnswer && currentGameState.answers){
      setCurrentGameState( { ...currentGameState, player_answer: playerAnswer } )
      setPlayerAnswer(false)
    }
    if (questionRef.current) questionRef.current.innerHTML = currentGameState.question

  }, [questionRef, gameState.current_sessions, currentGameState, playerAnswer])

  
  socket.on('send-question', (question, activeplayer, players) => {
    socket.on('send-answers', (shuffledAnswers, correctAnswer) => {
      setCurrentGameState({
        current_player: activeplayer,
        players,
        question_number: currentGameState.question_number,
        question,
        answers: shuffledAnswers,
        correct_answer: correctAnswer,
        player_answer: currentGameState.player_answer,
        max_questions: currentGameState.max_questions,
        timer: currentGameState.timer,
        scores: currentGameState.scores
      })
    })
  })

  if(!answerChecked) {
    console.log('fired')
    socket.emit('answer-question', playerAnswer)
  }

  return (
    <div id="game">
        {!currentGameState.answers ? <p>Loading....</p> 
          : (
              <>
              <div className="triva-stage">
                <LeaderBoard users={currentGameState.players}/>
                <Clock timer={currentGameState.timer}/>
                <Player/>
              </div>
              <div className="question-section">
                <div className="current-question">
                  <span className="round-section"><QuestionCounter current={currentGameState.question_number} final={currentGameState.max_questions}/></span>
                  <p ref={questionRef}>Question</p>
                </div>
                <div className="answer-section">
                  {
                    currentGameState.answers.map((answer, index) => <Answer key={index} correct={currentGameState.correct_answer} text={answer} callback={setPlayerAnswer}/>)
                  }
                </div>
              </div>
              </>
          )}
    </div>
  )
}

export default Questionspage