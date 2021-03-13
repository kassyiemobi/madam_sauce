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

//if (process.env.NODE_ENV ==='development'){
  //sendErrorDev(err,res);

//}else if (process.env.NODE_ENV === 'production'){
 // let error ={... err};
  //if (err.name === 'CastError')error = handleCastErrorDB(error);
   //if (err.name === "11000") error = handleDuplicateFieldsDB(error);
    //if (err.name === "ValidationError") error = handleValidationErrorDB(error);
    //if (err.name === "JsonWebTokenError") error = handleJWTErrorDB(error);
  //    if (err.name === "TokenExpiredError") error = handleJWTExpiredErrorDB(error);
//
   //  sendErrorProd(error, res)
    //}
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};


