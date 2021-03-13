const express = require('express');
const mealController = require('./../controllers/mealController');
const app = require('./../app')
const authController = require('./../controllers/authController')
const mealRouter = express.Router();

mealRouter
    .route('/')
    .get(authController.protect, mealController.getAllMeals)
    .post(mealController.createMeal)

mealRouter
  .route('/:id')
  .get(mealController.getMeal)
  .patch(mealController.updateMeal)
  .delete(authController.protect, authController.restrictTo('admin'), mealController.DeleteMeal);

module.exports =    mealRouter;