const mongoose = require('mongoose')
const { isEmail } = require('validator')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    email : {
        type: String,
        required : [ true , " Please enter an email address "],
        unique: true,
        lowercase: true,
        validate: [isEmail, "Please Enter a Valid Email"]
    },
    password : {
        type: String,
        required : [ true , " Please enter a password "],
        minlength: 6
    }
})

userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password,salt)
    next();
    });

userSchema.post('save',function(doc,next){
console.log("New User was created and Saved to DB" , doc)
next();
});



const User = mongoose.model('User',userSchema)

module.exports = User;