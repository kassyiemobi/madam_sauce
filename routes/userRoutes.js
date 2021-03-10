const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController')
const app = require('./../app')

const userRouter = express.Router();

userRouter.post('/signup',authController.signup );
userRouter.post('/login', authController.login);



userRouter
    .route('/')
    .get( userController.getAllUsers)
    .post();
    
userRouter
    .route('/:id')
    .get()
    .post();

module.exports = userRouter;