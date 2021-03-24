const express = require('express');
const mealController = require('./../controllers/mealController');
const app = require('./../app')
const authController = require('./../controllers/authController')
const mealRouter = express.Router();
const reviewRouter = require('./../routes/reviewRoutes');


//instead of doing the nested route and repeating routes use a middle ware and import same route from review router
//this line of code helps create a review route from a meal router so that a user can acess the reviews for a meal , from the meal route
mealRouter.use('/:mealId/reviews', reviewRouter);


mealRouter
    .route('/')
    .get( mealController.getAllMeals)
    .post(mealController.createMeal, authController.protect, authController.restrictTo('admin'))

mealRouter
  .route("/:id")
  .get(mealController.getMeal)
  .patch(
    mealController.updateMeal,
    authController.protect,
    authController.restrictTo("admin")
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    mealController.DeleteMeal
  );

module.exports = mealRouter;