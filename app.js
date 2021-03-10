const express = require('express');
const app = express()
const mealRouter = require('./routes/mealRoutes')
const userRouter = require('./routes/userRoutes')

const AppError = require('./utils/appError')
const globalErrorHandler = require ('./controllers/errorController')

//routes
app.use(express.json());
app.use('/api/v1/meals',mealRouter);
app.use("/api/v1/users", userRouter);

//this is here because the valid routes have to work first before this works
app.all ('*', (req,  res, next) => {
    next(new AppError(`Cant find ${req.originalUrl}on the server!`,404));
});


app.use(globalErrorHandler)

module.exports = app;