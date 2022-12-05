const dotenv = require('dotenv').config()
const {Client} = require('pg')
const fs = require('fs');
const dev = process.env.NODE_ENV == 'development' ? true : false

const seeds = fs.readFileSync(__dirname + '/seed.sql').toString()

const db = new Client({
    connectionString: process.env.DATABASE_URL
})

dev && db.query(seeds, () => console.log('database seeded'))

module.exports = {db, seeds}
