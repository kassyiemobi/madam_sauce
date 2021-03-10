const Meal = require('../models/mealModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync')


//create meals using the .create method
exports.createMeal = catchAsync(async (req , res, next) => {
    const newMeal = await Meal.create(req.body);
    
    
    res.status(200).json({
         status:'success',
          data:{
               meal:newMeal
            }
            })
});

//find all the meals by using the .find methos
exports.getAllMeals = catchAsync(async (req, res, next) => {
        const meals = await Meal.find();

        res.status(200).json({
            status : 'success',
            results: meals.length,
            data: {
                meals
            }
        });
    
});


exports.getMeal = catchAsync (async (req, res, next) => {
        const meal = await Meal.findById(req.params.id) 

        if(!meal){
           return next(new AppError('meal not found',404))
        }

        res.status(200).json({
            status: 'success',
            data:{
                meal
            }
        })
   
});


exports.updateMeal = catchAsync(async (req, res, next) => {
        const meal = await Meal.findByIdAndUpdate(req.params.id,req.body,{
            new:true
        })
        if (!meal) {
          return next(new AppError("meal not found", 404));
        }

        res.status(200).json({
            status: 'success',
            data:{
                meal
            }
        })
    
});


exports.DeleteMeal = catchAsync(async (req, res, next ) => {
    const meal = await Meal.findByIdAndDelete(req.params.id);

    if (!meal) {
      return next(new AppError("meal not found", 404));
    }

      res.status(200).json({
        status: "success",
        data: null
      });
});
