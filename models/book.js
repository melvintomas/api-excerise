const mongoose = require('mongoose')
const BookSchema = new mongoose.Schema({
    ISBN: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    author: {
        type:String,
        required: true
    }
}) 

const Book = mongoose.model('Book', BookSchema )

module.exports = Book