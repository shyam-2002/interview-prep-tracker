const { topic_model, question_model } = require("../models/ques_topic_schema");

const {handle_question_err}   = require("../Error_handeling/question_add_errors");

const topics_get = async (req,res)=>{
    const topics = await topic_model.find();
    res.locals.topics = topics;
    console.log(topics);
    res.render("courses", {title : "Courses"});
}


const questions_get = async (req, res)=>{
 const topic_name = req.params.topic_name;
 const topic = await topic_model.find({topic_name});
 const topic_id = topic[0]._id;
 const questions = await question_model.find({question_topic : topic_id, isApproved : true});
 res.locals.questions = questions;
 console.log(questions);
 res.render("questions", {title : topic_name});
}


const add_questions_post = async (req, res)=>{
   const {question_name, question_link, question_topic}  = req.body;
   console.log(req.body);
   try{
       const topic = await topic_model.find({topic_name : question_topic});
   if(topic.length == 0){
       throw new Error("you can not add new topic");
   }
   else{
       const topic_id = topic[0]._id;
        const question = await question_model.create({question_name, question_link, question_topic :topic_id});
        console.log(question);
        res.redirect("/topics");
   }

   }
   catch(err){
       console.log(err);
       const errors = handle_question_err(err);
       console.log(errors);
       res.json({errors});
   }
   
}



module.exports = {
   topics_get, questions_get, add_questions_post
}