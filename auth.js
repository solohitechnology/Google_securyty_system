const express = require('express');
const { default: helmet } = require('helmet');
const app = express();
const PORT = process.env.PORT || 4000;

app.use(helmet())

function checkLoggedIn(req, res, next) {
    const isLoggedIn = true; //todo
    if(!isLoggedIn) {
        res.status(401).json({
            error : 'you need to loggedIn'
        })
    }

    next()
}

app.get('/', checkLoggedIn, (req, res) => {
    res.send('you are authenticated wellcome to our home page')
})

app.get('/', (req,res) => {
    res.send('solohitechnology')
})

app.listen(PORT, () => console.log(`server running on port ${PORT}`))