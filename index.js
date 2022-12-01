const dotenv = require('dotenv').config()
const app = require('./server')
const port = process.env.PORT || 8080


app.listen(port, () => console.log(`> goodREACTion online @ http://localhost:${port}`))