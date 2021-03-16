const crypto = require("crypto");
const User = require("./../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");
const { config } = require("dotenv");
const sendEmail = require("./../services/mailerService");

config();

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
const logUserIn = (user, statusCode, res) => {
  const token = signToken(user._id);
  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};
exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    password: req.body.password,
    role: req.body.role,
  });
  logUserIn(newUser,201, res);
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
  logUserIn(user,200,res);
});

//to protect the content for only people who logged in
exports.protect = catchAsync(async (req, res, next) => {
  //get a token
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(
      new AppError("you are not logged in! Please login to continue", 401)
    );
  }
  // validate token
  const decode = jwt.verify(token, process.env.JWT_SECRET);

  //check if user still exists
  const checkUser = await User.findById(decode.id);
  if (!checkUser) {
    return next(new AppError("User no longer exists", 401));
  }
  req.user = checkUser;
  next();
});
// role authorization
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("you do not have permission to access this", 403)
      );
    }
    next();
  };
};
exports.forgotPassword = catchAsync(async (req, res, next) => {
  //get user from email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError("no user with email address", 404));
  }

  //generate random token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  //send it to user email
  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/users/resetPassword/${resetToken}`;

  const message = `forgot your password? submit a PATCH request with your new password to:${resetURL}.\n if you did not request this , please ignore this message.`;

  try {
    await sendEmail({
      email: user.email,
      subject: "your password reset token (valid for 10 mins)",
      message,
    });
    res.status(200).json({
      status: "success",
      message: "token sent to email",
    });
  } catch (err) {
    user.createPasswordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError("There was an error sending Email, try again later!", 500)
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  //get user based on token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    createPasswordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now },
  });

  //if token has not experired and there is user,set the new password
  if (!user) {
    return next(new AppError("token is invalid or has expired", 400));
  }
  user.password = req.body.password;
  user.createPasswordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();;
  //update changed password to user

  //log the user in
 logUserIn(user,200,res);
});
exports.updatePassword= catchAsync(async(req, res, next) =>{//for logged in user without forgetting password
// request current password
const user = await User.findById(req.user.id).Select('+password')

//check if password is correct
if(!user.correctPassword(req.body.passwordConfirm, user.passwordConfirm)){
  return next(new AppError('current password is incorrect!', 401));
}
//update password
user.password =req.body.password;
user.passwordConfirm = req.body.passwordConfirm;
await user.save();
//log user in
logUserIn(user,200,res);
});