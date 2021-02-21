
const {company_model, experience_model} = require("../models/exp_comp_schema");
const { question_model } = require("../models/ques_topic_schema");


const companies_get  = async (req, res)=>{
    const companies = await company_model.find();
    res.locals.companies = companies;
    console.log(companies);
    res.render("companies", {title : "Companies"})
}


const experiences_get  = async(req, res)=>{
    const company_name = req.params.company_name;
    try{
        const company = await company_model.find({company_name});
    
    const company_id = company[0]._id;
    console.log(company_id);
    const experiences = await experience_model.find({company_name : company_id, isApproved : true});
    res.locals.experiences = experiences;

    res.render("exp_template", {title : "Experiences", company_name});

    }
    catch(err){
        console.log(err);
    }
    
}


const add_experience_post  = async (req, res)=>{
    console.log(req.body);
    const {name, company_name, image, exp} = req.body;
    const image_object = JSON.parse(image);
    const image_data = image_object.data;
    try{
        const company = await company_model.find({company_name});
        const company_id = company[0]._id;
        const buffer_data = Buffer.from(image_data);
        // console.log(buffer_data);
        const experience = await experience_model.create({name, company_name : company_id, image_buffer : buffer_data, image_type : image_object.type, exp})
        // console.log(experience);
        res.redirect("/companies");
    }
    catch(err){
         console.log(err);
    }
}


const individual_full_experience_get = async (req, res)=>{
    const company_name = req.params.company_name;
    const person_id = req.params.person_id;
    try{
      
       const person = await experience_model.findById(person_id);
       res.locals.person  = person;
       res.render("full_experience_individual", {company_name});

    }
    catch(err){
        console.log(err);
    }
    
   
}



module.exports = {
    companies_get, experiences_get, add_experience_post, individual_full_experience_get
}