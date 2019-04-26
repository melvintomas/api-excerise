const express = require('express')
const router = express.Router()
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, (email, password, done) => {
    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            bcrypt.compare(password, user.password, (err, match) => {
                if (match) {
                    jwt.sign({ user: user }, 'SECRET', (err, token) => {
                        user.token = token
                        return done(null, user);
                    })
                } else {
                    return done(null, false, { message: 'Incorrect password.' });
                }
            })
        }).catch(err => console.log("Err", err))
}
));

// login users
router.post('/login', (req, res, next) => {
    passport.authenticate('local', function (err, user, info) {
        if (user) {
            res.json({
                status: "success",
                data: user
            })
        } else {
            res.json({
                status: "fail",
                message: info
            })
        }
    })(req, res)
})

// create new users
router.post('/create', (req, res) => {
    const newUser = new User(req.body)

    newUser.save().then(user => {
        res.json({
            status: "success",
            message: user
        })
    }).catch(err => {
        res.status(400).json({
            status: "fail",
            message: err.message
        })
    })
})






module.exports = router;