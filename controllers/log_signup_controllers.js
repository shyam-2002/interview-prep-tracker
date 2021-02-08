require("dotenv").config();
const secret = process.env.secret;


const jwt  = require("jsonwebtoken");

const {user_model} = require("../models/user_schema");

const {handle_err} = require("../Error_handeling/user_log_sign_errors");
const { nextTick } = require("process");

const maxAge = 3*24*3600;

const create_token = function(id){
    const token = jwt.sign({id}, secret, {expiresIn : maxAge});
    return token;
}


const login_get = (req, res)=>{
    res.render("login", {title : "Login"})
}


const signup_get = (req, res)=>{
    res.render("signup", {title : "Sign Up"})
}


const login_post = async (req, res, next)=>{
    const {email , password} = req.body;
    try{
        const user = await user_model.login(email, password);
        const token = create_token(user._id);
        res.cookie("jwt", token, {maxAge : maxAge*1000, httpOnly : true});
        res.redirect("/topics");
    }
    catch(err){
        const errors = handle_err(err);
        
      console.log(err);
      res.status(400).json({errors});
    }
    
    
}


const signup_post = async (req, res)=>{
    const {user_name, email, password} = req.body;

    try{
          const user = await user_model.create({user_name, email, password});
          const token = create_token(user._id);
          res.cookie("jwt", token, {maxAge : maxAge*1000, httpOnly : true})
          res.redirect("/");
    }
    catch(err){
        const errors = handle_err(err);

           console.log(err);
           res.status(400).json({errors});
    }
    
}


const logout_get = (req, res)=>{
      res.cookie("jwt", "", {maxAge : 1, httpOnly : true});
      res.redirect("/");
}



module.exports = {
    login_get, login_post, signup_get, signup_post, logout_get
}