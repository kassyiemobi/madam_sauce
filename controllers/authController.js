const User= require ('./../models/userModel');
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const jwt = require('jsonwebtoken');
const { config } = require('dotenv')

config();
exports.signup =catchAsync ( async(req, res, next) => {
    const newUser = await User.create({
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        password: req.body.password

    });
    const token = jwt.sign({ id : newUser._id}, 'process.env.JWT_SECRET',{
        expiresIn: process.env.JWT_EXPIRES_IN
    });

    res.status(201).json({
        status: 'success',
        token,
        data: {
            newUser
        }
    });
});