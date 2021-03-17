const AppError = require('./../utils/appError');

//const handleCastErrorDB = err => {
  //const message = `invalid ${err.path}: ${err.value}.`;
  //return new AppError(message, 400);
//};

//const handleJWTErrorDB = err => 
 // new AppError('invalid token, please login again!', 401)
  
  
  
//const handleJWTExpiredErrorDB = err => new AppError('your token has expired. Please login again!', 401)




module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};


