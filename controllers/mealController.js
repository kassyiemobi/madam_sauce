const Meal = require('../models/mealModel');


exports.createMeal = async (req , res) => {
    try{
        const newMeal = await Meal.create(req.body);
         res.status(200).json({
             status:'success',
             data:{
                 meal:newMeal
             }
            });
        }catch(err){
            res.status(400).json({
                status:'fail',
                message: err
            })
        }
       

};


exports.getAllMeals = (req, res) => {};


exports.getMeal = (req, res) => {};


exports.updateMeal = (req, res) => {};


exports.DeleteMeal = (req, res) => {};
