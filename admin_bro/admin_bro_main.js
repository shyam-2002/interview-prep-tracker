require("dotenv").config();
const admin_rootpath = process.env.admin_rootpath


const express = require("express");
const adminbro_rout = express.Router();

const AdminBro = require("admin-bro");
const AdminBroExpress = require("@admin-bro/express");
const AdminBroMongoose = require("@admin-bro/mongoose");
const bcrypt = require("bcrypt");
const express_session = require("express-session");

const session = express_session({                //create a session instance for using authentication of admin bro
    secret: "nothing",
    resave: true,
    saveUninitialized: true
});


AdminBro.registerAdapter(AdminBroMongoose);




const {question_model, topic_model} = require("../models/ques_topic_schema");
const {company_model, experience_model} = require("../models/exp_comp_schema");
const {admin_model} = require("../models/admin_model.js");


const adminbro = new AdminBro({
    resources : [question_model, topic_model, company_model, experience_model]
})

const router = AdminBroExpress.buildAuthenticatedRouter(adminbro, {
    authenticate: async (email, password) => {
        const admin = await admin_model.findOne({ email })
        // console.log("check");
        if (admin) {

            const isValidAdmin = await bcrypt.compare(password, admin.password);
            if (isValidAdmin) {
                // console.log("validadmin");
                return admin;

            }

        }
        return false;
    }
});

// adminbro_rout.get(adminbro.options.rootPath, router);

module.exports = {
   admin_rootpath, router, session
}

