const express = require("express");

const gen_router = express.Router();

const {isUser} = require("../auth/authuser");

const { home_controller, aboutus_controller} = require("../controllers/gen_controllers");

gen_router.get("/", isUser, home_controller)
gen_router.get("/aboutus", aboutus_controller);

module.exports = {gen_router}