const Meal = require('../models/mealModel');

//create meals using the .create method
exports.createMeal = async (req , res) => {
    //try this and catch any errors
    try{
 //create a new meal requesting from the body section of postman
        const newMeal = await Meal.create(req.body);
// give us a 200 status if it is successful
         res.status(200).json({
             status:'success',
//show us the data that was collected
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
