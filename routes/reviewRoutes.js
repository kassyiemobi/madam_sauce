const express = require("express");
const reviewController = require("./../controllers/reviewController");
const authController = require("./../controllers/authController");

//this merges the router here with the meal routes to avoid duplication of codes
const reviewRouter = express.Router({ mergeParams: true });

reviewRouter
  .route("/")
  .get(reviewController.getAllReviews)
  .post(
    reviewController.createReview,
    authController.protect,
    authController.restrictTo("user")
  );
  

module.exports = reviewRouter;
