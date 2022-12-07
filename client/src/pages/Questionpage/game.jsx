import { useState } from "react";
import TriviaItem from "./trivia-item"
import Stats from "./stats"
import triviaData from "./trivia-data";

function Game(){
    const [gameState, setGameState] = useState({
    score: 0,
    triviaIndex: 0,
    isGameOver: false,
    });

    
    const { score, triviaIndex, isGameOver} = gameState;
    const questionNumber = triviaIndex + 1;
    const numQuestions = triviaData. length;

    //use trivaIndex to pull out a single question
    const triviaQuestion = triviaData[triviaIndex];
    const {correct_answer, incorrect_answers, question} = triviaQuestion;

    console.log(correct_answer, incorrect_answers, question)

    let pageContent = <TriviaItem question={question} correctAnswer={correct_answer} incorrectAnswers={incorrect_answers} />;
    return (<>
        {/* <p>{score}</p>
        <p>{triviaIndex}</p>
        <p>{isGameOver ? "Game is over": "Game is not over"}</p>
        <p>{question}</p> */}
        <Stats score= {score} questionNumber={questionNumber} totalQuestions={numQuestions} />
        {pageContent}
    </>
    )
}

export default Game
