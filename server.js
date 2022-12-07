const path = require('path')
const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv').config()

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
        origin: ["http://localhost:3000",
                "http://127.0.0.1:3000"]
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
            const userList = io.sockets.adapter.rooms.get(lobbyId).players
            console.log(userList)
            socket.emit("send-to-lobby", lobbyId, username, userList)
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



            let userList = io.sockets.adapter.rooms.get(lobbyId).players;
            userList.push(username)
            
            socket.emit("send-to-lobby", lobbyId, username, userList)
            io.to(lobbyId).emit("user-joined", userList) // this part isn't working yet - marking to pick back up here
        }
        console.log(io.sockets.adapter.rooms)
    })

    socket.on("get-user-list", (lobbyId) => {
        const userList = io.sockets.adapter.rooms.get(lobbyId).players
        socket.emit("send-user-list", userList)
    })

    socket.on("start-game", (lobbyId, options) => {
        console.log("Starting game in lobby:", lobbyId)
        console.log("With options:", options)
        console.log(io.sockets.adapter.rooms)

        // Get questions - we can either add handling for true/false answers or only fetch multiple choice
        const questionData = []


        io.to(lobbyId).emit("go-to-quiz")

        // loop for number of questions
        questionData.forEach(question => {

            // send question
            io.to(lobbyId).emit("send-question", question.question) // recieve on client to display

            // shuffles and sends answers - untested
            let answers = question.incorrect_answers.push(question.correct_answer)
            let shuffledAnswers = answers.sort((a, b) => Math.random() - 0.5)
            io.to(lobbyId).emit("send-answers", shuffledAnswers)

            // if time runs out skip to next
            let timer = options.timer;
            let answered = false;

            setInterval(() => {
                if (timer == 0 && answered == false) {      // Checks if answered to not skip showing correct answer
                    io.to(lobbyId).emit("next-question")
                }
                return timer--
            }, 1000)



            // set active player
            // wait for active player to answer and set answered to true to avoid skipping next question countdown
            socket.on("answer-question", (answer) => {
                answered = true
                if (answer == question.correct_answer) {
                    io.to(lobbyId).emit("correct-answer")
                } else {
                    io.to(lobbyId).emit("wrong-answer")
                }

            // check if correct and calculate score based on time
            // add score to local leaderboard

            })


            // wait for 5 seconds
                // show correct answer to users
                // get ready next player...

            let pause = 5

            setInterval(() => {
                if (pause == 0) {
                    io.to(lobbyId).emit("next-question")
                }
                return pause--
            }, 1000)


            // next question

        })



        // All questions answered, display winner

    })
    
    

    socket.on('disconnect', () => {

    })
})



module.exports = server