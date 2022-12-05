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
        origin: ["http://127.0.0.1:3000"] 
    }
})

io.on("connection", socket => {
    console.log("New connection:", socket.id)

    socket.on('create-lobby', (lobbyId, cb) => {
        if (!io.sockets.adapter.rooms[lobbyId]) {
            socket.join(lobbyId)
            console.log("New room created:", io.sockets.adapter.rooms)
        } else {
            cb(`Room name already in use`)
        }
        console.log("New room created:", io.sockets.adapter.rooms)
    })



    // Should also check number of players in lobby and not join if full
    socket.on('join-lobby', (lobbyId, cb) => {
        console.log(cb)
        if (!io.sockets.adapter.rooms[lobbyId]){
            cb(`Lobby "${lobbyId}" does not exist`)
        } else {
            socket.join(lobbyId)
            cb(`Joined lobby. LobbyId: ${lobbyId}`)
        }
        console.log(io.sockets.adapter.rooms)
    })

  
    socket.on('disconnect', () => {

    })
})




module.exports = server