const mongoose = require("mongoose");

const mealSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A meal must have a name"],
  },

  price: {
    type: Number,
    required: [true, "A meal must have a price"],

  },
  imageCover: {
    type: String,
    //required: [true, "A meal must have a cover Image "],
  },
  image_url: {
    type: String,
   // required: [true, "meal image must be included"],
  },
  
},
{
  toJSON:{ virtuals:true },
  toObject: { virtuals:true }
}
);
//virtual populate to show the reviews of any meal when the meal is called.
mealSchema.virtual('reviews',{
  ref: 'Review', 
  foreignField: 'meal',
  localField:'_id'

}//next thing should be to populate here

)
const Meal = mongoose.model('Meal', mealSchema)

module.exports = Meal;