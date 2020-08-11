var campgrounds=require("../models/campground");
var Comment=require("../models/comment");
var middlewereObj={};
middlewereObj.checkCommentUser=function(req,res,next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id,function(err,found){
            if(err){
                req.flash("error","comment not found");
                res.redirect("back");
            }else{
                if(found.author.id.equals(req.user._id)){
                    next();
                }else{
                    req.flash("error","you dont have permission to do that");
                    res.redirect("back");
                }
            }
        });
    }else{
        req.flash("error","you need to be logged in to do that");
        res.redirect("back");
    }
};
middlewereObj.isLoggedIn= function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","you need to be logged in to do that");
    res.redirect("/login");
};
middlewereObj.checkUser= function(req,res,next){
    if(req.isAuthenticated()){
        campgrounds.findById(req.params.id,function(err,found){
            if(err){
                req.flash("error","campground not found");
                res.redirect("back");
            }else{
                if(found.author.id.equals(req.user._id)){
                    next();
                }else{
                    req.flash("error","you dont have permission to do that");
                    res.redirect("back");
                }
            }
        });
    }else{
        req.flash("error","you need to be logged in to do that");
        res.redirect("back");
    }
}
module.exports = middlewereObj;