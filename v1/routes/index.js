      
var express=require("express");
var router=express.Router(),
    passport=require("passport"),
    User=require("../models/user");
//app.use(express.static("public"));
router.get("/",function(req,res){
    res.render("landing");
});


///auth routes
//----------
///register page
//app.use(express.static("public"));
router.get("/register",function(req,res){
    res.render("register");
});
//route for signup logic
//app.use(express.static("public"));
router.post("/register",function(req,res){
    User.register(new User({username:req.body.username}),req.body.password,function(err,user){
        if(err){
            //console.log("err");
            req.flash("error",err.message);
            res.redirect("register");
        }
        passport.authenticate("local")(req,res,function(){
            req.flash("success","Welcome to YelpCamp "+user.username);
            res.redirect("/campgrounds");
        });
    });
});
//login routes
//login form--already
//app.use(express.static("public"));
router.get("/login",function(req, res) {
    res.render("login");
});
//login logic
//app.use(express.static("public"));
router.post("/login",passport.authenticate("local",{
                        successRedirect:"/campgrounds",
                        faliureRedirect:"/login"
                 }),function(req,res){
    
        });
        
//logout
router.get("/logout",function(req, res) {
    req.logout();
    req.flash("success","loged out successfully");
    res.redirect("/campgrounds");
});
module.exports=router;