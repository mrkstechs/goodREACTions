import React from "react";

function Options ({ category, difficulty, timer, maxPlayers, numQuestions , updateCategory, updateDifficulty, updateTimer, updateMaxPlayers, updateNumQuestions }) {

    async function setCategory(e) {
        const newCategory = e.target.value
        updateCategory(newCategory)
    }

    function setDifficulty(e) {
        const newDifficulty = e.target.value
        updateDifficulty(newDifficulty)
    }

    function setTimer(e) {
        const newTimer = e.target.value
        updateTimer(newTimer)
    }

    function setMaxPlayers(e) {
        const newMaxPlayers = e.target.value
        updateMaxPlayers(newMaxPlayers)
    }

    
    function setNumQuestions(e) {
        const newNumQuestions = e.target.value
        updateNumQuestions(newNumQuestions)
    }

    return <div id="lobbyOptions">
                <h2>Options:</h2>
                <form id="optionsForm">
                    <select aria-label="category" name="category" className="dropdownInput" onChange={setCategory} value={category}>
                        <option value="any">Any Category</option>
                        <option value="9">General Knowledge</option>
                        <option value="10">Entertainment: Books</option>
                        <option value="11">Entertainment: Film</option>
                        <option value="12">Entertainment: Music</option>
                        <option value="13">Entertainment: Musicals &amp; Theatres</option>
                        <option value="14">Entertainment: Television</option>
                        <option value="15">Entertainment: Video Games</option>
                        <option value="16">Entertainment: Board Games</option>
                        <option value="17">Science &amp; Nature</option>
                        <option value="18">Science: Computers</option>
                        <option value="19">Science: Mathematics</option>
                        <option value="20">Mythology</option>
                        <option value="21">Sports</option>
                        <option value="22">Geography</option>
                        <option value="23">History</option>
                        <option value="24">Politics</option>
                        <option value="25">Art</option>
                        <option value="26">Celebrities</option>
                        <option value="27">Animals</option>
                        <option value="28">Vehicles</option>
                        <option value="29">Entertainment: Comics</option>
                        <option value="30">Science: Gadgets</option>
                        <option value="31">Entertainment: Japanese Anime &amp; Manga</option>
                        <option value="32">Entertainment: Cartoon &amp; Animations</option>
                    </select>  
                    <select name="difficulty" className="dropdownInput" onChange={setDifficulty} value={difficulty}>
                        <option value="any">Any Difficulty</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                    <label htmlFor="timer">Time Per Question: {timer} seconds</label>
                    <input type="range" min="5" max="60" name="timer" className="inputSlider" onChange={setTimer} value={timer} />
                    <label htmlFor="maxPlayers">Max Players: {maxPlayers} players</label>
                    <input type="range" min="1" max="8" name="maxPlayers" className="inputSlider" onChange={setMaxPlayers} value={maxPlayers}/>
                    <label htmlFor="numQuestions">Number of Questions: {numQuestions} questions</label>
                    <input type="range" min="1" max="20" name="numQuestions" className="inputSlider" onChange={setNumQuestions} value={numQuestions}/>
                </form>
            </div>                
}

export default Options;