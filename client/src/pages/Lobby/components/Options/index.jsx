import React, { useEffect } from "react";

function Options ({ config, update }) {

    const {category, difficulty, timer, maxPlayers, numQuestions} = config

    const handler = (e) => {
        switch (e.target.name) {
            case 'category':
                update({ ...config, category: e.target.value })
                break;
            case 'difficulty':
                update({ ...config, difficulty: e.target.value })
                break;
            case 'timer':
                update({ ...config, timer: e.target.value })
                break;
            case 'maxPlayers':
                update({ ...config, maxPlayers: e.target.value })
                break;
            case 'numQuestions':
                update({ ...config, numQuestions: e.target.value })
                break;
            default:
                break;
        }
    }

    return <div id="lobbyOptions">
                <h2>Options:</h2>
                <form id="optionsForm">
                    <select aria-label="category" name="category" className="dropdownInput" onChange={handler} value={category}>
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
                    <select name="difficulty" className="dropdownInput" onChange={handler} value={difficulty}>
                        <option value="any">Any Difficulty</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                    <label htmlFor="timer">Time Per Question: {timer} seconds</label>
                    <input type="range" min="5" max="60" name="timer" className="inputSlider" onChange={handler} value={timer} />
                    <label htmlFor="maxPlayers">Max Players: {maxPlayers} players</label>
                    <input type="range" min="1" max="8" name="maxPlayers" className="inputSlider" onChange={handler} value={maxPlayers}/>
                    <label htmlFor="numQuestions">Number of Questions: {numQuestions} questions</label>
                    <input type="range" min="1" max="20" name="numQuestions" className="inputSlider" onChange={handler} value={numQuestions}/>
                </form>
            </div>                
}

export default Options;