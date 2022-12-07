import shuffle from "./shuffle"

import { socket } from "../../App"

function TriviaItem({ correctAnswer, incorrectAnswers, question }) {
    const allAnswers = [correctAnswer, ...incorrectAnswers];
    const shuffledAnswers = shuffle(allAnswers)

    function sendAnswer(e) {
        console.log(e.target.value)
        socket.emit("answer-question", e.target.value)
    }

    return <div>
        <p className="trivia-item__question">{question}</p>
        <ul className="trivia-item__answers">
            {shuffledAnswers.map((answer, i ) => {

                return(
                    <li key={answer}>
                <button onClick={sendAnswer} id="trivia-item__button" value={answer}>{answer}</button>
            </li>
                );
            })}
            
        </ul>
    </div>
}
export default TriviaItem
