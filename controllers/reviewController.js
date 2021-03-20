const Review = require('./../models/reviewModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');


exports.createReview = catchAsync(async(req, res, next)=>{
    const newReview = await Review.create(req.body);

    // if(!Review){
    //     return new AppError('', 400)
    // };
    res.status(201).json({
        status: 'success',
        data:{
            newReview
        }
    });
});

exports.getAllReviews = catchAsync(async(req, res, next)=>{
    const reviews = await Review.find();
    //  if (!Review) {
    //    return new AppError("", 400);
    //  }
     res.status(200).json({
       status: "success",
       result: reviews.length,
       data: {
         reviews
       }
     });
})