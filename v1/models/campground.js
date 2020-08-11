var mongoose=require("mongoose");
var campgroundSchema=new mongoose.Schema({
    author:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        username:String
    },
    name:String,
    price:String,
    image:String,
    desc:String,
    comments:[{
            type: mongoose.Schema.Types.ObjectId,
            rel:"Comment"
       } ]
});
module.exports= mongoose.model("campgrounds",campgroundSchema);