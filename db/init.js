const dotenv = require('dotenv').config()
const {Client, Pool} = require('pg')
const fs = require('fs');

const seeds = fs.readFileSync(__dirname + '/seed.sql').toString()

const db = new Client({
    connectionString: process.env.DATABASE_URL
})

db.connect(err => err ? console.error('connection error!', err.stack) : console.log('postgres db conntected!'))
db.query(seeds, () => console.log('database seeded'))

module.exports = {db}
