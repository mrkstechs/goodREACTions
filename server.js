const path = require('path')
const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv').config()
const axios = require('axios')

const server = express()
const apiRoutes = require('./routes')

server.use(cors())
server.use(express.json())

server.use('/api', apiRoutes)

server.use(express.static(path.resolve(__dirname + '/client/dist')))

server.get('/', (req, res) => res.sendFile(path.resolve(__dirname + '/client/dist/index.html')))

// Socket.io things

const io = require('socket.io')(2333, {
    cors: {
        origin: ["*","*:3000","*:2333",
        "http://localhost:3000", 
        "http://192.168.56.1:3000",
        "http://192.168.56.1:2333",
        "http://192.168.2.238:3000",
        "http://192.168.2.238:2333",
        "http://172.21.48.1:3000",
        "http://172.21.48.1:2333"]
    }
})

io.on("connection", socket => {
    console.log("New connection:", socket.id)

    socket.on('create-lobby', (lobbyId, username) => {
        socket.username = username;
        if (io.sockets.adapter.rooms.get(lobbyId)){
            socket.emit("console-message", `Lobby "${lobbyId}" name already in use`)
        } else {
            socket.join(lobbyId)
            socket.emit("console-message", `Created lobby. LobbyId: ${lobbyId}`)
            io.sockets.adapter.rooms.get(lobbyId).host = socket.id;
            io.sockets.adapter.rooms.get(lobbyId).players = [username];
            io.sockets.adapter.rooms.get(lobbyId).sockets = [socket.id];
            const userList = io.sockets.adapter.rooms.get(lobbyId).players
            const gameHost = io.sockets.adapter.rooms.get(lobbyId).host
            socket.emit("send-to-lobby", lobbyId, username, userList, gameHost)
        }
        console.log(io.sockets.adapter.rooms)
    }, {cors: { origin: '*'}})

    // Should also check number of players in lobby and not join if full

    socket.on('join-lobby', (lobbyId, username, cb) => {
        socket.username = username;
        if (!io.sockets.adapter.rooms.get(lobbyId)){
            socket.emit("console-message", `Lobby "${lobbyId}" does not exist`)
        } else {
            socket.join(lobbyId)
            socket.emit("console-message", `Joined lobby. LobbyId: ${lobbyId}`)

            const gameHost = io.sockets.adapter.rooms.get(lobbyId).host
            let userList = io.sockets.adapter.rooms.get(lobbyId).players;
            userList.push(username)

            let socketList = io.sockets.adapter.rooms.get(lobbyId).sockets;
            socketList.push(socket.id)

            socket.emit("send-to-lobby", lobbyId, username, userList, gameHost)
            io.to(lobbyId).emit("user-joined", userList)
        }
        console.log(io.sockets.adapter.rooms)
    })

    socket.on("get-user-list", (lobbyId) => {
        const userList = io.sockets.adapter.rooms.get(lobbyId).players
        socket.emit("send-user-list", userList)
    })


    /*
    Game Start
    */

    socket.on("start-game", async (lobbyId, options) => {
        if (socket.id === io.sockets.adapter.rooms.get(lobbyId).host) {
            console.log("Starting game in lobby:", lobbyId)
            console.log("With options:", options)

            console.log(io.sockets.adapter.rooms.get(lobbyId))




            // initialise active player and question num

            const lobby = io.sockets.adapter.rooms.get(lobbyId)
            const players = lobby.players
            lobby.activePlayerTracker = 0
            lobby.activePlayer = {socketId: lobby.sockets[lobby.activePlayerTracker],
                                username: players[lobby.activePlayerTracker]}
            lobby.options = options

            // Fetch questions from API
            let questionData = await fetchQuestions(options, players)
            lobby.questions = questionData

            // Tells lobby game is starting
            
            io.to(lobbyId).emit("game-starting", questionData)
    }})

    socket.on("init-game", async (lobbyId) => {

        let lobby = io.sockets.adapter.rooms.get(lobbyId)
        let questionData = lobby.questions
        let options = lobby.options
        let players = lobby.players

        for (const question of questionData) {
    
            lobby = io.sockets.adapter.rooms.get(lobbyId)
            let activePlayer = lobby.activePlayer

            console.log("Current player:", activePlayer, "Players: ",players)
            // send question
            console.log(question.question)
            io.to(lobbyId).emit("send-question", question.question, activePlayer, players)          // recieve on client to display and know who to add score to / display as active

            // shuffles and sends answers - untested
            let answers = question.incorrect_answers
            let correctAnswer = question.correct_answer
            if(answers.length <= 3) answers.push(correctAnswer) 
            let shuffledAnswers = answers.sort((a, b) => Math.random() - 0.5)
            io.to(lobbyId).emit("send-answers", shuffledAnswers, correctAnswer)                        // recieve on client to display

            
            // wait for active player to answer
            let answered = false;

            const response = new Promise((resolve) => {
                socket.on("answer-question", (answer) => {                           // needs sent by the client then recieves returns below - timer on client, if timeout send "timeout" as answer
                    console.log("Answer sent by: ", socket.id)
                    console.log("Active player", activePlayer.socketId)                           
                    if( socket.id === activePlayer.socketId ){
                        resolve(answer)
                    }
                })
            })

            const answer = await response;
                 
            console.log("recieved answer: ", answer)
            answered = true
            if (answer == question.correct_answer) {
                score = calculateScore(timer, options.timer)
                io.to(lobbyId).emit("correct-answer", score)                    // recieve on client and add score on local leaderboard to activePlayer sent with question
            } else if (answer == "timeout") {
                io.to(lobbyId).emit("time-out")                                 // recieve on client to display timeout 
            } else {
                io.to(lobbyId).emit("wrong-answer")                             // recieve on client to display wrong answer
            }

            await nextQuestion(lobbyId)                               // updates active player and waits 5 seconds so screen can be displayed before next loop starts and next "send-question" is emitted
        }

        io.to(lobbyId).emit("game-over")         // All questions answered, display winner on client
    })

    

    socket.on("add-highscore", (name, score) => {
        if( socket.id === lobbyId.host ){
            // Add score to leaderboard
            axios.post("http://localhost:3000/api/highscores", {body: {name, score}})
        }
    })

    socket.on('disconnect', () => {

    })

})

    
async function fetchQuestions(options, players) {
    let url;
    if (options.numQuestions * players.length <= 50) {
        options.numQuestions = options.numQuestions * players.length
    } else {
        options.numQuestions = 50;
    }
    if (options.category == "any" && options.difficulty == "any") {
        url = `https://opentdb.com/api.php?amount=${options.numQuestions}&type=multiple`
    } else if (options.category != "any" && options.difficulty == "any") {
        url = `https://opentdb.com/api.php?amount=${options.numQuestions}&category=${options.category}&type=multiple`
    } else if (options.category == "any" && options.difficulty != "any") {
        url = `https://opentdb.com/api.php?amount=${options.numQuestions}&difficulty=${options.difficulty}&type=multiple`
    } else if (options.category != "any" && !options.difficulty != "any"){
        url = `https://opentdb.com/api.php?amount=${options.numQuestions}&category=${options.category}&difficulty=${options.difficulty}&type=multiple`
    }

    try {
        const response = await axios.get(url)
        return questionData = response.data.results
    } catch (err) {
        console.log("Error fetching questions: ", err)
    }

}


async function nextQuestion(lobbyId) {

    const lobby = io.sockets.adapter.rooms.get(lobbyId)
    let options = lobby.options
    let players = lobby.players

    lobby.activePlayer
    lobby.activePlayerTracker

    //Update active player
    lobby.activePlayerTracker < (players.length-1 ) ? lobby.activePlayerTracker++ : lobby.activePlayerTracker = 0

    lobby.activePlayer = {socketId: lobby.sockets[lobby.activePlayerTracker],
                     username: players[lobby.activePlayerTracker]}


    // wait for 5 seconds show correct answer to users and get ready next player...

    const response = new Promise((resolve) => {
        let pause = 5

        setInterval(() => {
            if (pause == 0) {
                resolve()
            }
            return pause--
        }, 1000)
    })
    
    const next = await response

}

function calculateScore(timer, maxTime) {
    let score = timer * 10

    let timeTaken = maxTime - timer

    for (let i = timeTaken; i > 0; i--) {
        score /= 1.05;
    }
    
    score = Math.floor(score)
    return(score)
}

module.exports = { server, fetchQuestions, calculateScore}