const mongoose = require('mongoose');
const { validate } = require('./mealModel');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
    firstName :{
        type: String,
        required: [true,'Please enter First Name']
    },
    lastName :{
        type:String,
        required:[true,'please enter Last Name']
    },
    email :{
        type: String,
        required:[true, 'please enter your email'],
        lowercase:true
    },
    phoneNumber:{
        type:Number,
        required:[true, 'please enter a valid number'] 
       },
    password:{
        type:String,
        required:[true, 'please provide a password'],
        minlenght:10,
        select: false
    },
    photo: String
})
//encrypting a new password
userSchema.pre('save',  async function(next){
 //when saving a new password || if password was not modified
    if(!this.isModified('password'))return next();
//encrypts password before saving
    this.password = await bcrypt.hash(this.password,12)

});
//to authenticate login password
userSchema.methods.correctPassword = function(candidatePassword, userPassword){
    return bcrypt.compare(candidatePassword, userPassword);
};



const User = mongoose.model('User', userSchema);

module.exports = User;


