import shuffle from "./shuffle"

function TriviaItem({ correctAnswer, incorrectAnswers, question }) {
    const allAnswers = [correctAnswer, ...incorrectAnswers];
    const shuffledAnswers = shuffle(allAnswers)

    return <div>
        <p className="trivia-item__question">{question}</p>
        <ul className="trivia-item__answers">
            {shuffledAnswers.map((answer, i ) => {

                return(
                    <li key={answer}>
                <button id="trivia-item__button">{answer}</button>
            </li>
                );
            })}
            
        </ul>
    </div>
}
export default TriviaItem
