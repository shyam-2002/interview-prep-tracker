const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const {isEmail} = require("validator");    


const Schema = mongoose.Schema;

// user schema for a normal user
const user_schema =  Schema({
    user_name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        validate : [isEmail, "Please enter a valid email"],   //isEmail function to check if the email is valid
        unique : true
    },
    password : {
        type : String,
        required : true,
        minlength : [6, "Password is too short"],             //set minimum length of password to be 6

    }
}, {timestamps : true})                                       //it will add timestamps whenever we create or update a document


user_schema.pre("save", async function(next){                 
    const salt = await bcrypt.genSalt();
    this.password  = await bcrypt.hash(this.password, salt);
    next();
})

user_schema.statics.login = async function(email , password , next){
        const user  = await user_model.findOne({email});
        if(user){
              const is_valid_user = await bcrypt.compare(password, user.password);
              if(is_valid_user){
                  return user;
              }
              else{
                  throw new Error("password error");
              }
              
        }
        else{
             throw new Error("email error");
        }
}

const user_model = mongoose.model("User", user_schema);

module.exports = {
    user_model
}