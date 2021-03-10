const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController')
const app = require('./../app')

const userRouter = express.Router();

userRouter.post('/signup',authController.signup );



userRouter
    .route('/')
    .get()
    .post();
    
userRouter
    .route('/:id')
    .get()
    .post();

module.exports = userRouter;