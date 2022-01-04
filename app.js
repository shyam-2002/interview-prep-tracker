


const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const app = express();





//requiring all routers
const {gen_router} = require("./routes/gen_routes");  
const {log_sign_router} = require("./routes/login_signup_routes");  
const {topic_router} = require("./routes/topic_routes");
const {experience_router} = require("./routes/experience_routes");

const {admin_rootpath, router, session} = require("./admin_bro/admin_bro_main");

const {isUser, auth_function} = require("./auth/authuser");

const port = process.env.PORT;
const dbURI = process.env.dbURI;

mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex : true })
        .then(
            app.listen(port, ()=>{
                console.log(`server listening at port ${port}`);
            })
        )
        .catch(err=>{
            console.log(err);
        })

app.use(session);        
app.use(admin_rootpath, router);


app.set("view engine", "ejs");
app.use(express.static("./public"))
app.use(express.json());                                      //parses json data
app.use(express.urlencoded({extended : true, limit : '50mb'}));               //parses x-www-form-urlencoded data
app.use(cookieParser());


app.use('*/', isUser);

app.use("*/topics", auth_function);                           //auth_function middleware will be used whenever there is a requrest to topic related routes

app.use(gen_router);
app.use(log_sign_router);

app.use(   topic_router);

app.use(experience_router);



