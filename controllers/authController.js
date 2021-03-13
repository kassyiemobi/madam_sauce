const { promisify } = require ('util')
const User = require("./../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");
const { config } = require("dotenv");
const sendEmail = require('./../services/mailerService')

config();

const signToken = id => {
     return jwt.sign({ id: id }, process.env.JWT_SECRET, {
       expiresIn: process.env.JWT_EXPIRES_IN,
     });

}
exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    password: req.body.password,
    role: req.body.role
  });
  const token =signToken (newUser._id);

  res.status(201).json({
    status: "success",
    token,
    data: {
      newUser,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  //if email and password exists
  if (!email || !password) {
    return next(new AppError("please provide email and password!", 400));
  }
  //check if user exists and password is correct
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("incorrect email or password", 401));
  }
  //if everything is okay, send token to client
  const token = signToken(user._id);
  res.status(200).json({
    status: "success",
    token,
  });
});

//to protect the content for only people who logged in
exports.protect = catchAsync(async(req, res, next) =>{

//get a token
let token;
if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    token = req.headers.authorization.split(' ')[1];
}
if(!token){
    return next (new AppError('you are not logged in! Please login to continue', 401))
}
    // validate token
const decode = (jwt.verify)(token, process.env.JWT_SECRET);


//check if user still exists
const checkUser = await User.findById(decode.id);
if(!checkUser){
  return next (new AppError('User no longer exists', 401))
}
  req.user =checkUser;
    next()
})
// role authorization
exports.restrictTo = (...roles) => {
  return(req, res, next)=> {
    if (!roles.includes(req.user.role)){
      return next(new AppError('you do not have permission to access this', 403));
    };
    next();
  }
} 
exports.forgotPassword= catchAsync(async(req, res, next) => {
//get user from email
const user = await User.findOne( {email: req.body.email});
if(!user){
  return next(new AppError('no user with email address', 404));
}


//generate random token
const resetToken = user.createPasswordResetToken()
await user.save( {validateBeforeSave : false});

//send it to user email
//cosnt resetURL
})
exports.resetPassword = (req, res, next) =>{

}