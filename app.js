const express = require('express');
const app = express();
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const AppError = require("./utils/appError");
const mongoSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')

const globalErrorHandler = require ('./controllers/errorController')


//Global middlewares

//secure http headers
app.use(helmet());

//limit requests from same IP
const limiter =rateLimit({
    max:100,
    windowMs:60* 60* 1000,
    message:'too many request from this IP,please try again in an hour'
})
app.use('/api', limiter)

//body parser.....req.body
app.use(express.json());

//Data sanitization against NOSQL query injection
app.use(mongoSanitize());

//Data sanitization against cross site scripting XSS
app.use(xss());

//test middle ware
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    console.log(req.headers);
        next();
});

//routes
const mealRouter = require("./routes/mealRoutes");
const userRouter = require("./routes/userRoutes");
const reviewRouter = require ('./routes/reviewRoutes')

app.use('/api/v1/meals',mealRouter);
app.use('/api/v1/users',userRouter);
app.use('/api/v1/reviews',reviewRouter);
//this is here because the valid routes have to work first before this works
app.all ('*', (req,  res, next) => {
    next(new AppError(`Cant find ${req.originalUrl}on the server!`,404));
});


app.use(globalErrorHandler)

module.exports = app;