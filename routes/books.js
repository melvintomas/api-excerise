const express = require('express')
const router = express.Router()
const Book = require('../models/book')
const Institution = require('../models/institution')
const jwt = require('jsonwebtoken')

// get books available to user
router.get('/',(req,res)=>{
    
    jwt.verify(req.token, 'SECRET', function(err, decoded) {
        const emailDomain = decoded.user.email.split('@')[1]
            Institution.findOne({emailDomain:emailDomain})
            .populate('books').then(books =>{
                res.json(books)
            }).catch(err=>console.log(err)) 


    });
})

module.exports = router;