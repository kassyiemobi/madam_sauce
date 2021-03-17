const express = require('express');
const app = express();
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');



const mealRouter = require('./routes/mealRoutes')
const userRouter = require('./routes/userRoutes')
const AppError = require('./utils/appError')
const globalErrorHandler = require ('./controllers/errorController')


//Global middlewares
//limit requests from same IP
const limiter =rateLimit({
    max:100,
    windowMs:60* 60* 1000,
    message:'too many request from this IP,please try again in an hour'
})
app.use('/api', limiter)

//security HTTP headers
app.use(helmet())

//body parser.....req.body
app.use(express.json());

//test middle ware
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    console.log(req.headers);
        next();
});


//routes
app.use('/api/v1/meals',mealRouter);
app.use('/api/v1/users',userRouter);

//this is here because the valid routes have to work first before this works
app.all ('*', (req,  res, next) => {
    next(new AppError(`Cant find ${req.originalUrl}on the server!`,404));
});


app.use(globalErrorHandler)

module.exports = app;