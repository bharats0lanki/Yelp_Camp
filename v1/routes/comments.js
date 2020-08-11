var express=require("express");
var app=express.Router();
var campgrounds=require("../models/campground");
var Comment=require("../models/comment");
var middlewere=require("../middlewere");
/////////--------------
//      COMMENTS ROUTES
///////----------------

app.get("/campgrounds/:id/comments/new",middlewere.isLoggedIn,function(req, res) {
    
    campgrounds.findById(req.params.id,function(err,found){
        if(err){
            console.log(err);
        }else{
             res.render("comments/new",{campground:found});
        }
    });
   
});
app.post("/campgrounds/:id/comments",middlewere.isLoggedIn,function(req,res){
    campgrounds.findById(req.params.id,function(err,found){
        if(err){
            console.log(err);
        }else{
             Comment.create(req.body.comment,function(err,comment){
                 if(err){
                     res.redirect("/campgrounds");
                 }else{
                     comment.author.id=req.user._id;
                     comment.author.username=req.user.username;
                     //save the comment
                     comment.save();  
                     found.comments.push(comment);
                     found.save();
                     req.flash("success","successfully added comment!!!");
                     res.redirect("/campgrounds/"+req.params.id);
                 }
                 
             });
        }
    });
});
//edit route for comment
app.get("/campgrounds/:id/comments/:comment_id/edit", middlewere.checkCommentUser ,function(req,res){
    Comment.findById(req.params.comment_id,function(err,found){
        if(err){
            res.redirect("back");
        }else{
            
             res.render("comments/edit", {comment:found , campground_id:req.params.id});
        }
    });
});
//update route --put 
app.put("/campgrounds/:id/comments/:comment_id",  middlewere.checkCommentUser ,function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,uc){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});
//delete route for a specific comment
app.delete("/campgrounds/:id/comments/:comment_id",  middlewere.checkCommentUser ,function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id,function(err){
        if(err){
            res.redirect("back");
        } else {
            req.flash("success","comment deleted successfully");
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});

module.exports = app;