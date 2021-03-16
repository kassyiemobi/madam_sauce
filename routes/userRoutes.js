const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController')
const app = require('./../app')

const userRouter = express.Router();

userRouter.post('/signup',authController.signup );
userRouter.post('/login', authController.login);
userRouter.post("/forgotPassword", authController.forgotPassword);
userRouter.patch("/resetPassword", authController.resetPassword);

userRouter.patch('/updatePassword',authController.protect,authController.updatePassword)


userRouter
    .route('/')
    .get( userController.getAllUsers)
    .post();
    
userRouter
    .route('/:id')
    .get()
    .post();

module.exports = userRouter;