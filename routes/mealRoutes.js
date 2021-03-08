const express = require('express');
const mealController = require('./../controllers/mealController');

const router = express.Router();

router
    .route('/')
    .get(mealController.getAllMeals)
    .post(mealController.createMeal)

router
    .route('/:id')
    .get(mealController.getMeal)
    .patch(mealController.updateMeal)
    .delete(mealController.DeleteMeal)

module.exports = router;