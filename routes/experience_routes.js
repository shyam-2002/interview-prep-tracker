const express = require("express");
const { companies_get, experiences_get, add_experience_post ,individual_full_experience_get } = require("../controllers/experience_controllers");


const experience_router = express.Router();



experience_router.get("/companies",companies_get)
experience_router.get("/companies/:company_name", experiences_get )
experience_router.post("/add_experience", add_experience_post);
experience_router.get("/experiences/:company_name/:person_id", individual_full_experience_get);


module.exports = {
  experience_router
}