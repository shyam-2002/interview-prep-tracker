require("dotenv").config();


const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const {admin_model }= require("./models/admin_model.js");

const dbURI = process.env.dbURI;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology : true })
     .then()
     .catch(err=>{
         console.log(err);
     })

const admin1  = new admin_model({
    email : "goyalshyamsundar20@gmail.com",
    password : "hi there"
})     

try{
    admin1.save()
}
catch{
   console.log(err);
}

     