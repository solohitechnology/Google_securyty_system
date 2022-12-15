const fs = require('fs');
const path = require('path');
const https = require('https');
const helmet = require('helmet');
const express = require('express');
const passport = require('passport');
const { Strategy } = require('passport-google-oauth20')
const PORT = process.env.PORT || 3000;

require('dotenv').config();

const config = {
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRETE: process.env.CLIENT_SECRETE,
}

const AUTH_OPTION = {
    CALLBACKURL: '/auth/google/callback',
    ClientID: config.CLIENT_ID,
    ClientSecrete: config.CLIENT_SECRETE,
}

function verifyCallback(accessToken, refreshToken, profile, done) {
    console.info('Google profile', profile)
    done(null, profile)
}

app.use(new Strategy(AUTH_OPTION, verifyCallback))

const app = express();

app.use(helmet());
app.use(passport.initialize())

function checkLoggedIn(req, res, next) {
    const isLoggedIn = true; //todo
    if (!isLoggedIn) {
        res.status(401).json({
            error: 'you must logedIn'
        });
    }

    next();

}

app.get('/auth/google', passport.authenticate('google', {
    scope: [' email '],
}));

app.get('/auth/google/callback',
    passport.authenticate('google', {
        failiureRedirect: '/failure',
        successRedirect: '/',
        session: false,
    }),
    (req, res) => {
        console.log('Google call us back!');
    }
);

app.get('/auth/logout', (req, res) => {
    passport.logOut();
    res.redirect('/')

});

app.get('/secrete', checkLoggedIn, (req, res) => {
    res.send('your secrete is 42')
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.get('/failure', (req, res) => {
    res.send(' failed to logIn! ');
})

https.createServer({

    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem'),

}, app).listen(PORT, () => console.log('server runing on port ' + PORT))
