var express=require("express"),
    app=express(),
    bodyparser=require("body-parser"),
    mongoose=require("mongoose"),
    campgrounds=require("./models/campground"),
    seedDb=require("./seed"),
    Comment=require("./models/comment"),
    User=require("./models/user"),
    passport=require("passport"),
    LocalStategy=require("passport-local"),
    methodOverride=require("method-override"),
    flash=require("connect-flash");
var campgroundRoutes=require("./routes/campgrounds"),
    commentsRoutes=require("./routes/comments"),
    indexRoutes=require("./routes/index");
    

//seedDb();
//sudo killall mongod
//./mongod
//nodemon to start
    
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));
app.set("view engine","ejs");
app.use(methodOverride("_method"));

app.use(require("express-session")({
    secret:"asdfghj",
    resave:false,
   saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(flash());
app.use(function(req,res,next){
    res.locals.currentUser=req.user;
    res.locals.error=req.flash("error");
    res.locals.success=req.flash("success");
    next();
});

app.use("/" ,campgroundRoutes);
app.use("/" ,commentsRoutes);
app.use("/" ,indexRoutes);

// campgrounds.create({name:"auli", image:"https://toib.b-cdn.net/wp-content/uploads/2017/08/spiti-valley-himachal-pradesh.jpg",desc:"beautiful place and at a great height,cold temp"},
//                     function(err,camp){
//                         if(err){
//                             console.log(err);
//                         }else{
//                             console.log(camp);
//                         }
// });

  
app.listen(process.env.PORT,process.env.IP,function(){
    console.log("app started");
});