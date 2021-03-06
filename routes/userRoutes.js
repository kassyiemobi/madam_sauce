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
userRouter.patch('/updateMe',authController.protect,userController.updateMe)
userRouter.delete("/deleteMe", authController.protect, userController.deleteMe)

//get me serves as a middleware here to get the loggedin users info
userRouter.get('/me', authController.protect, userController.getMe, userController.getUser)

userRouter
  .route("/")
  .get(
    userController.getAllUsers,
    authController.protect,
  )
  .post();
    
userRouter
  .route("/:id")
  .get(userController.getUser)
  .patch(
    userController.updateUser,
    authController.protect,
    authController.restrictTo("user"))
  .delete(userController.DeleteUser, authController.protect, authController.restrictTo('admin'));




module.exports = userRouter;