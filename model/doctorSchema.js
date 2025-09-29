const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const Credentials=require("./authenticate");
const Review=require("./reviewSchema");
const doctorSchema=new Schema({

    name:{
         type:String,
        required:true,
    },
    email:{
         type:String,
        required:true,
    },
    rating:{
         type:Number,
        
    },
    Experience:{
         type:String,
        required:true,
    },
    fees:{
        type:Number,
       required:true,

    },
    
    aboutMe:{
       type:String,
    },
    phoneNumber:{
        type:Number,
        required:true
    },
    availAppoint:{

    },
   Reviews:[
      {
      type: Schema.Types.ObjectId,
      ref:"Review",//from review model Id is gona come
      },
     ], 
    Owner :{
      type: Schema.Types.ObjectId,
      ref:"Credentials",//ref:Schema Name
     }  
});

const DoctorModel=mongoose.model("DoctorSchema",doctorSchema);
module.exports=DoctorModel;



