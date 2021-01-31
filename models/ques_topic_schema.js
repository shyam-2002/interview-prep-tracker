const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const question_schema  = new Schema({
    question_name : {
        type : String,
        required : true,
        unique : true
    },
    question_link :{
        type : String,
        required : true,
        unique : true
    },
    question_topic : {
        type : Schema.Types.ObjectId,
        ref : 'topic'
    },
    isApproved : {
        type : Boolean,
        default : false
    }
})


const topic_schema  = new Schema({
    topic_name : {
        type : String,
        required : true,
        unique : true
    }
})

const question_model = mongoose.model("question", question_schema);
const topic_model = mongoose.model("topic", topic_schema);

module.exports = {
    question_model, topic_model
}