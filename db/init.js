const dotenv = require('dotenv').config()
const {Client} = require('pg')
const fs = require('fs');

const db = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
})

db.connect(err => err ? console.error('connection error!', err.stack) : console.log('postgres db conntected!'))

module.exports = {db}
