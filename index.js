const dotenv = require('dotenv').config()
const app = require('./server')
const port = 5000


app.listen(port, () => console.log(`> goodREACTion online @ http://localhost:${port}`))