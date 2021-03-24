const User = require('./../models/userModel');
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const general = require("./../controllers/generalController");


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

exports.getAllUsers = general.GetAll(User)

exports.getUser = general.Get(User);
// Don not update password with this
exports.updateUser = general.Update(User)
exports.DeleteUser = general.Delete(User);

//to get the user without passing any Id in the param
exports.getMe = (req, res, next) =>{
  req.params.id = req.user.id;
  next()
}
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
//for user to delete self or deactivate
exports.deleteMe = catchAsync(async(req, res, next)=>{
  const deleteUser = await User.findByIdAndUpdate(req.user.id,{ active:false})
  res.status(204).json({
    status:'success',
    data:null
  })
})
