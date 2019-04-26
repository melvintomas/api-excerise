const mongoose = require('mongoose')
const Book = require('./book')
const Schema = mongoose.Schema;

const InstitutionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    url: {
        type: String
    },
    emailDomain: {
        type:String
    },
    books: [{
        type: Schema.Types.ObjectId,
        ref: 'Book' 
    }]
}) 

const Institution = mongoose.model('Institution', InstitutionSchema )

module.exports = Institution