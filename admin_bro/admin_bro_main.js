require("dotenv").config();
const admin_rootpath = process.env.admin_rootpath


const AdminBro = require("admin-bro");
const AdminBroExpress = require("@admin-bro/express");
const AdminBroMongoose = require("@admin-bro/mongoose");
AdminBro.registerAdapter(AdminBroMongoose);


const express = require("express");
const adminbro_rout = express.Router();


const {question_model, topic_model} = require("../models/ques_topic_schema");
const {company_model, experience_model} = require("../models/exp_comp_schema");



const adminbro = new AdminBro({
    resources : [question_model, topic_model, company_model, experience_model]
})

const router = AdminBroExpress.buildRouter(adminbro);

// adminbro_rout.get(adminbro.options.rootPath, router);

module.exports = {
   admin_rootpath, router
}

