



const home_controller = (req, res)=>{
    res.render("home");
}

const aboutus_controller = (req, res)=>{
    res.render("aboutus", {})
}

module.exports = {
    home_controller, aboutus_controller
}