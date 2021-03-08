const Meal = require('../models/mealModel');

//create meals using the .create method
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

//find all the meals by using the .find methos
exports.getAllMeals = async (req, res) => {
    try{
        const meals = await Meal.find();

        res.status(200).json({
            status : 'success',
            results: meals.length,
            data: {
                meals
            }
        });
    
    }catch (err){
        res.status(404).json({
            status:'fail',
            message :err
        });
    }
    
};


exports.getMeal = async (req, res) => {
    try{
        const meal = await Meal.findById(req.params.id) 
        res.status(200).json({
            status: 'success',
            data:{
                meal
            }
        })
    }catch(err){
        res.status(404).json({
            status:'fail',
            message :err
        });
    }
};


exports.updateMeal = async (req, res) => {
    try{
        const meal = await Meal.findByIdAndUpdate(req.params.id,req.body,{
            new:true
        })
        res.status(200).json({
            status: 'success',
            data:{
                meal
            }
        })
    }catch (err){
        res.status(404).json({
          status: "fail",
          message: err,
        });

    }
};


exports.DeleteMeal = async (req, res) => {
    try {
       await Meal.findByIdAndDelete(req.params.id);
      res.status(204).json({
        status: "success",
        data: null
      });
    } catch (err) {
      res.status(404).json({
        status: "fail",
        message: err,
      });
    }
};
