const express = require("express");
const { topics_get, questions_get, add_questions_post } = require("../controllers/topic_controllers");


const topic_router = express.Router();

// const {auth_function} = require("../auth/authuser");

topic_router.get("/topics",topics_get)
topic_router.get("/topics/:topic_name", questions_get )
topic_router.post("/add_questions", add_questions_post);



module.exports = {
  topic_router
}