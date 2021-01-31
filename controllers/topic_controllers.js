const { topic_model, question_model } = require("../models/ques_topic_schema");

const topics_get = async (req,res)=>{
    const topics = await topic_model.find();
    console.log(topics);
    res.send("came to topics page");
}


const questions_get = async (req, res)=>{
 const topic_name = req.params.topic_name;
 const topic = await topic_model.find({topic_name});
 const topic_id = topic[0]._id;
 const questions = await question_model.find({question_topic : topic_id, isApproved : true});
 console.log(questions);
}


const add_questions_post = async (req, res)=>{
   const {question_name, question_link, question_topic}  = req.body;
   const topic = await topic_model.find({topic_name : question_topic});
   if(topic.length == 0){
       throw new Error("you can not add new topic");
   }
   else{
       const topic_id = topic[0]._id;
        const question = await question_model.create({question_name, question_link, question_topic :topic_id});
        console.log(question);
   }
}



module.exports = {
   topics_get, questions_get, add_questions_post
}