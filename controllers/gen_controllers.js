



const home_controller = (req, res)=>{
    res.render("home", {title : 'Home'});
}

const aboutus_controller = (req, res)=>{
    res.render("aboutus", {title : "About Us"})
}

module.exports = {
    home_controller, aboutus_controller
}