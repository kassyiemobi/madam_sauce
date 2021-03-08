const express = require('express');
const mealController = require('./../controllers/mealController');
const app = require('./../app')

const mealRouter = express.Router();

mealRouter
    .route('/')
    .get(mealController.getAllMeals)
    .post(mealController.createMeal)

mealRouter
  .route('/:id')
  .get(mealController.getMeal)
  .patch(mealController.updateMeal)
  .delete(mealController.DeleteMeal);

module.exports =    mealRouter;