const express  = require("express");

const log_sign_router = express.Router();

const {login_get, signup_get, signup_post, login_post, logout_get} = require("../controllers/log_signup_controllers");




log_sign_router.get("/login", login_get)
log_sign_router.get("/signup", signup_get)
log_sign_router.post("/signup", signup_post)
log_sign_router.post("/login", login_post)
log_sign_router.get("/logout", logout_get)



module.exports = 
    {log_sign_router}
