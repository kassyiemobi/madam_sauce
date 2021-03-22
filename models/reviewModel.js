//review /createdAt/ref to tour/ ref to user
const mongoose = require('mongoose');


const reviewSchema = new mongoose.Schema({
    review :{
        type : String,
        required:[true, 'review cannot be empty']
    },
    rating:{
        type:Number,
        min:1,
        max:5
    },
    createdAt : {
        type:Date,
        default: Date.now

    },
    //using parent refrencing system because meal and user are parents of Review

    meal:{
        type:mongoose.Schema.ObjectId,
        ref: 'Meal',
        required:[true, 'review must belong to a meal']
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref: 'User',
        required:[true, 'review must belong to a user']
    }
},
{
    toJSON:{virtuals:true},
    toObject: {virtuals:true}

});

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: 'firstName lastName photo',
  })
next()
});



const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;