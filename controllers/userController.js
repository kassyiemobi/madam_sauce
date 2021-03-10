const User = require('./../models/userModel');
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.create = catchAsync(async (res, req, next) => {
    const newUser = await User.create (req.body);

    res.status(201).json({
      status: "success",
      data: {
        newUser,
      },
    });


})

exports.getAllUsers = catchAsync (async(res, req, next) => {
    const users = await User.find();

    res.status(200).json({
      status: "success",
      results: users.length,
      data: {
        uses,
      }
    });

});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!user) {
    return next(new AppError("user not found", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.DeleteUser = catchAsync(async (req, res, next) => {
  const user = await Meal.findByIdAndDelete(req.params.id);

  if (!user) {
    return next(new AppError("user not found", 404));
  }

  res.status(200).json({
    status: "success",
    data: null,
  });
});

