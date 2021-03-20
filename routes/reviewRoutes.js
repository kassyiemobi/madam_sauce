const express = require("express");
const reviewController = require("./../controllers/reviewController");
const reviewRouter = express.Router();
const authController = require("./../controllers/authController");

reviewRouter
  .route("/")
  .post(
    reviewController.createReview,
    authController.protect,
    authController.restrictTo("user")
  )
  .get(reviewController.getAllReviews);

module.exports = reviewRouter;
