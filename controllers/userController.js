const User = require('./../models/userModel');
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");


const filterObj =(obj,...allowedFeilds) => {
  const newObj = {};
  Object.keys(obj).forEach(el =>{
    if(allowedFeilds.includes(el))newObj[el]= obj[el];
  });
  return newObj;
};

exports.create = catchAsync(async (res, req, next) => {
    const newUser = await User.create (req.body);

    res.status(201).json({
      status: "success",
      data: {
        newUser,
      },
    });


})

exports.getAllUsers = catchAsync (async(req, res, next) => {
    const users = await User.find();
    
    res.status(200).json({
      status: "success",
      results: users.length,
      data: {
        users,
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

//for user to update self
exports.updateMe = catchAsync(async(req, res, next)=> {
  //create error if user post password data
  if(req.body.password){
    return next(new AppError('this route is not for password update!',400))
  }
  //filtered out unwanted field names 
  const filteredBody = filterObj(req.body,'firstName', 'lastName','email')//we can add other fields later
  
  //update user 
  const updatedUser = await User.findByIdAndUpdate(req.user.id,filteredBody, {
    new:true,
    runValidator:true
  });
  res.status(200).json({
    status:'success',
    data:{
      user:updatedUser
    }

  });
});

exports.deleteMe = catchAsync(async(req, res, next)=>{
  const deleteUser = await User.findByIdAndUpdate(req.user.id,{ active:false})
  res.status(204).json({
    status:'success',
    data:null
  })
})
