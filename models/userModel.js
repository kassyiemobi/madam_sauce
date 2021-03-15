const mongoose = require('mongoose');
const { validate } = require('./mealModel');
const bcrypt = require('bcryptjs');
const crypto = require('crypto')

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
    role:{
        type:String,
        enum:['user','admin'],
        default: 'user'
    },
    password:{
        type:String,
        required:[true, 'please provide a password'],
        minlenght:10,
        select: false
    },
    passwordResetToken :String,
    passwordResetExpires: Date,
    photo: String
})
//encrypting a new password
userSchema.pre('save',  async function(next){
 //when saving a new password || if password was not modified
    if(!this.isModified('password'))return next();
//encrypts password before saving
    this.password = await bcrypt.hash(this.password,12)

});
userSchema.pre('save', function(next){
    if(!this.isModified('password') || this.isNew) return next();

    this.passwordChangedAt = Date.now() - 1000;
    next();
});
//to authenticate login password
userSchema.methods.correctPassword = function(candidatePassword, userPassword){
    return bcrypt.compare(candidatePassword, userPassword);
};
//to reset password
userSchema.methods.createPasswordResetToken= function(){
    const resetToken = crypto.randomBytes(32).toString('hex');

    this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

    console.log({resetToken})

    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

    return resetToken;
}

const User = mongoose.model('User', userSchema);

module.exports = User;


