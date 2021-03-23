const express = require('express');
const mealController = require('./../controllers/mealController');
const app = require('./../app')
const authController = require('./../controllers/authController')
const mealRouter = express.Router();
const reviewRouter = require('./../routes/reviewRoutes');


//instead of doing the nested route and repeating routes use a middle ware and import same route from review router
mealRouter.use('/:mealId/reviews', reviewRouter);


mealRouter
    .route('/')
    .get( mealController.getAllMeals)
    .post(mealController.createMeal)

mealRouter
  .route('/:id')
  .get(mealController.getMeal)
  .patch(mealController.updateMeal)
  .delete(authController.protect, authController.restrictTo('admin'), mealController.DeleteMeal);

// mealRouter
//   .route('/:mealId/reviews')
//   .post(
//     authController.protect,
//     authController.restrictTo('user'),
//     reviewController.createReview
//   );

module.exports = mealRouter;