const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const company_schema = new Schema({
    company_name : {
        type : String,
        required:  true,
        unique : true
    }
})

const experience_schema = new Schema({
    name : {
        type : String,
        required : true
    },
    company_name : {
        type : Schema.Types.ObjectId,
        ref : 'company'
    },
    image_buffer : {
        type : Buffer,
        required : true
    },
    image_type : {
        type : String,
        required : true
    }
})


const company_model = mongoose.model("company", company_schema);
const experience_model = mongoose.model("experience", experience_schema);


module.exports = {
    company_model, experience_model
}