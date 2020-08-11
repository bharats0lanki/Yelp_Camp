var mongoose=require("mongoose"),
    campgrounds=require("./models/campground"),
    Comment=require("./models/comment");

var data=[
        {
            name:"manali",
            image:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTOqzPJPQDwk0DkBaAtn4qmdVsroUMdE6_EmMvSlTSRW-MIY_PW&usqp=CAU",
            desc:"green pine trees with adorable hills orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        },
        {
            name:"leh",
            image:"https://static.toiimg.com/thumb/msid-35431564,width-748,height-499,resizemode=4,imgsize-224073/Rishikesh.jpg",
            desc:"-50 heheheh cold temp orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        },
        {
            name:"auli",
            image:"https://www.euttaranchal.com/tourism/photos/69-1466163.jpg",
            desc:"green high hills orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        }
    ];
var cmnt={
    text:"place is awsome but no internet",
    author:"Homer"
};
function seedDb(){
    campgrounds.remove({},function(err,ret){
        if(err){
            console.log(err);
        }else{
            console.log("deleted");
            data.forEach(function(seed){
                campgrounds.create(seed,function(err,camp){
                    if(err){
                        console.log(err);
                    }else{
                        console.log(camp.name);
                        Comment.create(cmnt,function(err,comment){
                            if(err){
                                console.log(err);
                            }else{
                                camp.comments.push(comment);
                                camp.save();
                                console.log("created a comment");
                            }
                            
                        });
                    }
                });
            });
        }
    });
}

module.exports=seedDb;