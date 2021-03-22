const Review = require('./../models/reviewModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');


exports.createReview = catchAsync(async(req, res, next)=>{
  // if there is no request on the body, use the id on the params and use the id of the user
  if(!req.body.meal) req.body.meal = req.params.mealId;
  if(!req.body.user)req.body.user = req.user.id;

    const newReview = await Review.create(req.body);
    res.status(201).json({
        status: 'success',
        data:{
            newReview
        }
    });
});


exports.getAllReviews = catchAsync(async(req, res, next)=>{
  //check if there is a meal id and if there is one, get all the reviews related to that id
  let filter ={}
  if(req.params.mealId) filter ={ meal :req.params.mealId}
    const reviews = await Review.find(filter);
    console.log(reviews)
     res.status(200).json({
       status: "success",
       result: reviews.length,
       data: {
         reviews
       }
     });
})
