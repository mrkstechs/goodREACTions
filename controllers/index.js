const Score = require('../models/index')

const getScores = async (req, res) => {
    try {
        const scores = await Score.all
        res.status(200).json(scores)
    } catch (error) {
        res.status(500).json({error})
    }
}

const addScore = async (req, res) => {
    try {
        await Score.add(req.body)
        res.status(201).json({message: 'leaderboard updated'})
    } catch (error) {
        res.status(500).json({ error })
    }
}

module.exports = { getScores, addScore }