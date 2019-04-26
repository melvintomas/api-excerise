const express = require('express')
const app = express()
const bodyParser = require('body-parser')

// Routes
const index = require('./routes/index.js')
const user = require('./routes/users.js')
const book = require('./routes/books.js')

// Use body parser for json
app.use(bodyParser.json())

// Create middleware to authenticate user
function verifyToken(req,res,next){
    //Get auth header value
    let bearerHeader = req.headers.authorization;

    if(typeof bearerHeader !== 'undefined'){
        let token = bearerHeader.split(' ')[1]
        req.token = token
        next() 
    } else {
        res.sendStatus(403)
    }
}

app.get('/', index);
app.use('/users',user)
app.use('/books',verifyToken, book)
app.listen(3000, () => console.log(`Open http://localhost:3000 to see a response.`))

const Mongoose = require('mongoose')
Mongoose.connect("mongodb://localhost:27017/bibliotech",{ useNewUrlParser:true },()=>{
    console.log("connected to mongo")
})