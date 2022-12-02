const dotenv = require('dotenv').config()
const {Client, Pool} = require('pg')
const fs = require('fs');

const seeds = fs.readFileSync(__dirname + '/seed.sql').toString()

const db = new Client({
    connectionString: process.env.DATABASE_URL
})

module.exports = {db, seeds}
