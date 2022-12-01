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

module.exports = server