const {db} = require('../db/init')
module.exports = class Score {
    constructor(data){
        this.id = data.id
        this.name = data.name
        this.score = data.score
    }

    static add ({name, score}){
        return new Promise(async (resolve, reject) => {
            try {
                let result = await db.query(`INSERT INTO highscores (name, score) VALUES ($1, $2) RETURNING *;`, [name, score])
                let toAdd = new Score(result.rows[0])
                resolve(toAdd)
            } catch (error) {
                reject(`Error adding score: ${error}`)
            }
        })
    }

    static get all(){
        return new Promise (async (resolve, reject) => {
            try {
                let result = await db.query(`SELECT * FROM highscores`)
                let scores = result.rows.map(score => new Score(score))
                resolve(scores)
            } catch (error) {
                reject('Highscores not found!')
            }
        })
    }
}