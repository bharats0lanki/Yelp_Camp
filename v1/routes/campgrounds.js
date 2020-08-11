var express=require("express");
var app=express.Router();
var campgrounds=require("../models/campground");
var middlewere=require("../middlewere");
//REST convention
// INDEX
app.get("/campgrounds",function(req,res){
   
    campgrounds.find({},function(err,all){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/index",{campgrounds:all ,currentUser:req.user});
        }
    });
    
});

//CREATE 
app.post("/campgrounds",middlewere.isLoggedIn,function(req,res){
    var name=req.body.name;
    var price=req.body.price;
    var image=req.body.image;
    var desc=req.body.desc;
    var author={
        id:req.user._id,
        username:req.user.username
    };
    var camp=new campgrounds({name:name,price:price,image:image,desc:desc,author:author});
    camp.save();
    
    res.redirect("/campgrounds");
    
    
});
//NEW   display a form
app.get("/campgrounds/new",middlewere.isLoggedIn,function(req,res){
    res.render("campgrounds/new");
});

// SHOW  shows info about sites
app.get("/campgrounds/:id",function(req,res){
    campgrounds.findById(req.params.id,function(err,found){
        if(err){
            console.log(err);
        }else{
            
            res.render("campgrounds/show",{ campground:found,comments:found });
        }
    });

});
//EDIT ROUTES 
//edit show page
app.get("/campgrounds/:id/edit",middlewere.checkUser,function(req,res){
    campgrounds.findById(req.params.id,function(err,found){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }else{
            
            
           res.render("campgrounds/edit",{ campground:found});
        }
    });

});

//update route comes here
app.put("/campgrounds/:id",middlewere.checkUser,function(req,res){
    campgrounds.findByIdAndUpdate(req.params.id,req.body.campground , function(err,updated){
        if(err){
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});
//delete route
app.delete("/campgrounds/:id",middlewere.checkUser,function(req,res){
    campgrounds.findByIdAndDelete(req.params.id,function(err,del){
        if(err){
            console.log(err);
        }else{
            res.redirect("/campgrounds");
        }
    });
});





module.exports = app;