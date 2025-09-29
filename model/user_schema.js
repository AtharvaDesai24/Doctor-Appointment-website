const mongoose=require('mongoose');
const  Schema=mongoose.Schema;
const Appoint=require("./appointment");
const UserSchema=new Schema({

    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phoneNo:{
        type:Number,
        required:true
    },
    imgUrl:{
        type :String,
        //default:"https://www.w3schools.com/w3images/avatar2.png",
         set:(v)=>" "? "https://www.w3schools.com/w3images/avatar2.png":v,
    },
    appointment:[
     {
    type: Schema.Types.ObjectId,
      ref:"Appoint",
     }
    ]

});

const User= mongoose.model("User",UserSchema);
module.exports=User;


