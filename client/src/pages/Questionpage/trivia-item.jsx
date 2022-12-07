function TriviaItem({ correctAnswer, incorrectAnswers, question }) {
    return <div>
        <p className="trivia-item__question">{question}</p>
        <ul className="trivia-item__answers">
            <li>
                <button id="trivia-item__button">{correctAnswer}</button>
            </li>
            <li>
                <button id="trivia-item__button">{incorrectAnswers[0]}</button>
            </li>
            <li>
                <button id="trivia-item__button">{incorrectAnswers[1]}</button>
            </li>
            <li> <button id="trivia-item__button">{incorrectAnswers[2]}</button> </li>
        </ul>
    </div>
}
export default TriviaItem
