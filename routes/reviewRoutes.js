const express = require("express");
const reviewController = require("./../controllers/reviewController");
const reviewRouter = express.Router();
const authController = require("./../controllers/authController");

reviewRouter
  .route("/")
  .get(reviewController.getAllReviews)
  .post(
    reviewController.createReview,
    authController.protect,
    authController.restrictTo("user")
  );
  

module.exports = reviewRouter;
