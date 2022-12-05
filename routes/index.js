const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.status(200).res.json({message: 'hello, world'})
})

module.exports = router