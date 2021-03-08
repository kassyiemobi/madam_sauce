const express = require('express');
const app = express()
const mealRouter = require('./routes/mealRoutes')




app.use(express.json());
app.use('/api/v1/meals',mealRouter)
module.exports = app;