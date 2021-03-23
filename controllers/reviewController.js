const Review = require('./../models/reviewModel');
const catchAsync = require('./../utils/catchAsync');
const general = require("./../controllers/generalController");


exports.createReview = catchAsync(async(req, res, next)=>{
  // if there is no request on the body, use the id on the params and use the id of the user
  console.log('nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn')
  if(!req.body.meal) req.body.meal = req.params.mealId;
  console.log('----------------------------------------------------------------')
  if(!req.body.user)req.body.user = req.user.id;

    const newReview = await Review.create(req.body)
    console.log(newReview)
    res.status(201).json({
        status: 'success',
        data:{
            newReview
        }
    });
});


exports.getAllReviews = general.GetAll(Review)
exports.getReview = general.Get(Review);
exports.updateReview = general.Update(Review);
exports.deleteReview = general.Delete(Review);