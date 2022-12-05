const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.status(200).res.json({message: 'hello, world'})
})

router.get('/highscores', (req, res) => {
    res.status(200).json(
        new Promise (async (resolve, reject) => {
        try {
            let scoreData = await db.query(`SELECT * FROM highscores`)
            // Think this might need a model
            resolve(scoreData.rows)
        } catch (err) {
            reject(`Error getting highscores: ${err}`)
        }
    })
    )
})

router.post('/highscores', (req, res) => {
    let name = req.body.name
    let highscore = req.body.highscore

    res.status(200).json(
        new Promise (async (resolve, reject) => {
            try {
                await db.query(`INSERT INTO highscores (name, highscore) VALUES ($1, $2);`, [ name, highscore ])
                resolve("Added successfully")
            } catch (err) {
                reject(`Error adding highscore to database: ${err}`)
            }
        })
    )
})

module.exports = router