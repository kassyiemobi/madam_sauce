//this is a controller that will control the CRUD requests of othe controllers

const { Model } = require("mongoose");
const catchAsync = require('./../utils/catchAsync')
const AppError = require ('./../utils/appError');
const { populate } = require("../models/reviewModel");


exports.Create = Model => catchAsync(async (res, req, next) => {
  const doc = await Model.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      doc,
    },
  });
});

exports.Get=(Model, popOption) =>  catchAsync (async (req, res, next) => {
    //create a query that says if theres a populate object, add the object
    let query = Model.findById (req.params. id);
    if (popOption) query = query.populate(popOption);
    const doc = await query

        if(!doc){
           return next(new AppError('document not found',404))
        }

        res.status(200).json({
            status: 'success',
            data:{
                doc
            }
        })
   
});

exports.GetAll = (Model) =>
  catchAsync(async (req, res, next) => {
    //to allow for nested Get review on meals
    //check if there is a an id and if there is one, get all the reviews related to that id
    let filter = {};
    if (req.params.mealId) filter = { meal: req.params.mealId };
    const docs = await Model.find(filter);

    res.status(200).json({
      status: "success",
      results: docs.length,
      data: {
        docs,
      },
    });
  });


exports.Delete = Model =>
 catchAsync(async (req, res, next) => {
  const doc = await Model.findByIdAndDelete(req.params.id);

  if (!doc) {
    return next(new AppError(" No document found with that 1D", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.Update = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!doc) {
      return next(new AppError("document not found", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        doc,
      },
    });
  });
