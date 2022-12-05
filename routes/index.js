const express = require('express')
const { getScores, addScore } = require('../controllers')
const router = express.Router()

router.get('/', (req, res) => {
    res.status(200).res.json({message: 'hello, world'})
})

router.get('/highscores', (req, res) => {
    getScores(req, res)
})

router.post('/highscores', (req, res) => {
    addScore(req, res)
})

module.exports = router