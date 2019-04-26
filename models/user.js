const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Institution = require('./institution')
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 30
    },
    email: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
        validate: [{
            validator: function(v){
                const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
                return emailRegex.test(v)
            },
            message: "Incorrect Email format"
        },{
            validator: function(v){
                return User.find({email:v})
                    .then(users=> users.length == 0)
                    .catch(err=>console.log(err))
            },
            message: "email already taken"
        },{
            validator: function(v){
                const domain = v.split("@")[1]
                console.log(domain)
                Institution.findOne({emailDomain:domain}).then(i=>console.log(i))
                .catch(err=>console.log(err))
                return Institution.find({emailDomain:domain})
                    .then(users=> users.length > 0)
                    .catch(err=>console.log(err))
            },
            message: "invalid email domain"
        }]
    },
    role: {
        type:String,
        enum: ['student', 'academic', 'administrator'],
        required: true
    },
    password: {
        type:String,
        required: true
    },
    token: String
}) 

 UserSchema.set('toJSON', {
     transform: function(doc, ret, opt) {
         delete ret['password']
         return ret
     }
 })

UserSchema.pre('save',function(next){
    //hash password before saving
    if(this.isModified('password')){
        bcrypt.hash(this.password,10)
        .then(hash=>this.password = hash)
        .then(()=>{next()})
        .catch(err=> console.log(err))
    } else {
        next()
    }
})

const User = mongoose.model('User', UserSchema )


module.exports = User