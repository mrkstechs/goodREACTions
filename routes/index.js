const express = require('express')
const router = express.Router()

const db = require("../db/dbConfig")

router.get('/', (req, res) => {
    res.status(200).res.json({message: 'hello, world'})
})

router.post('/highscores', (req, res) => {
    let name = req.body.name
    let highscore = req.body.highscore

    return new Promise (async (resolve, reject) => {
        try {
            await db.query(`INSERT INTO highscores (name, highscore) VALUES ($1, $2);`, [ name, highscore ])
            resolve("Added successfully")
        } catch (err) {
            reject(`Error adding highscore to database: ${err}`)
        }
    })
})

module.exports = router