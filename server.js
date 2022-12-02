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
    console.log(socket.id)


    // Should also check number of players in lobby and not join if full
    socket.on('join-lobby', (lobbyId, cb) => {
        socket.join(lobbyId)
        cb(`Joined lobby. LobbyId: ${lobbyId}`)
    })

})




module.exports = server