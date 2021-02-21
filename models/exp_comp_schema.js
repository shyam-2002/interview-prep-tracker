const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const company_schema = new Schema({
    company_name : {
        type : String,
        required:  true,
        unique : true
    },
    company_image : {
        type : String,
        required : true
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
    exp : {
        type : String,
        required : true,
        minlength : [50, 'Experience is too short']
    },
    image_buffer : {
        type : Buffer
    },
    image_type : {
        type : String
        
    },
    isApproved : {
        type : Boolean,
        default : true
    }
})


const company_model = mongoose.model("company", company_schema);
const experience_model = mongoose.model("experience", experience_schema);


module.exports = {
    company_model, experience_model
}