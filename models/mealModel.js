const mongoose = require("mongoose");

const mealSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A meal must have a name"],
    unique: true,
  },

  price: {
    type: Number,
    required: [true, "A meal must have a price"],
  },
  ratings: {
    type: Number,
  },
  imageCover: {
    type: String,
    //required: [true, "A meal must have a cover Image "],
  },

  comments: {
    type: String,
    
  },
  image_url: {
    type: String,
   // required: [true, "meal image must be included"],
  }
});
const Meal = mongoose.model('Meal', mealSchema)

module.exports = Meal;