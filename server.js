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
        origin: ["http://localhost:3000"]
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
        console.log(io.sockets.adapter.rooms)



        io.to(lobbyId).emit("go-to-quiz")
    })
    
    

    socket.on('disconnect', () => {

    })
})



module.exports = server