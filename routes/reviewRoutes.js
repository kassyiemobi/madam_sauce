const express = require("express");
const reviewController = require("./../controllers/reviewController");
const authController = require("./../controllers/authController");
const { Router } = require("express");

//this merges the router here with the meal routes to avoid duplication of codes
const reviewRouter = express.Router({ mergeParams: true });

reviewRouter.use(authController.protect)
reviewRouter
  .route("/")
  .get(reviewController.getAllReviews)
  .post(
    reviewController.createReview,
    authController.restrictTo('user')
  );
  
reviewRouter
  .route ('/:id')
  .get(reviewController.getReview)
  .patch(reviewController.updateReview)
  .delete(reviewController.deleteReview)

module.exports = reviewRouter;
