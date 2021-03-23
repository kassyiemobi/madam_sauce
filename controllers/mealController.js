const Meal = require('../models/mealModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync')
const general = require('./../controllers/generalController')



exports.createMeal = general.Create
exports.getAllMeals =general.GetAll(Meal);
exports.getMeal = general.Get(Meal, {path : 'reviews'});
exports.updateMeal = general.Update(Meal);
exports.DeleteMeal = general.Delete(Meal);
