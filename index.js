const dotenv = require('dotenv').config()
const app = require('./server')
const {db, seeds} = require('./db/init')
const port = process.env.PORT || 8080

app.listen(port, () => {
    db.connect(err => err ? console.error('connection error!', err.stack) : console.log('postgres db conntected!'))
    db.query(seeds, () => console.log('database seeded'))
    console.log(`> goodREACTion online @ http://localhost:${port}`)
})