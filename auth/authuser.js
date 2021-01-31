require("dotenv").config();


const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const {user_model} = require("../models/user_schema");

const secret = process.env.secret;

const auth_function = async (req, res, next)=>{
    const token = req.cookies.jwt;
    if(token){
          const is_valid_token = jwt.verify(token, secret, (err, decodedToken)=>{
              if(err){
                  res.redirect("/login");
              }
              else{
                  next();
              }
          })
    }
    else{
          res.redirect("/login");
    }
}

const isUser = async (req, res, next)=>{
    const token = req.cookies.jwt;
    if(token){
          const is_valid_token = jwt.verify(token, secret, async (err, decodedToken)=>{
              if(err){
                  res.locals.user  = null;
                  next();
              }
              else{
                //   console.log(decodedToken);
                  const id = decodedToken.id;
                  const user = await user_model.findById(id);
                  res.locals.user  = user;
                  next();
              }
          })
    }
    else{
          res.locals.user = null;
          next();
    }
}

module.exports = {
    auth_function, isUser
}