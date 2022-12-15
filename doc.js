const fs = require('fs')
const https = require('https')
const express = require('express')
const PORT = process.env.PORT || 2000;
const app = express()

app.get('/', (req, res) => {
    res.send("solohitechnology sever access success POWER!!")
})

https.createServer({

    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem'),

}, app).listen(PORT, () => console.log('server runing on port ' + PORT))
