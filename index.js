require("dotenv").config();
const GMapAPIkey=process.env.GOOGLE_CLOUD_API_KEY;
const exp=require("express");
const app=exp();
const port=3000;
const info=require("./init/info");
const ejs=require("ejs");
const path=require("path");
const methodOvverride=require("method-override");
app.use(methodOvverride("_method"));
app.set('view engine','ejs');
app.use(exp.urlencoded({ extended: true })); 
app.set("views",path.join(__dirname,"views"));
app.use(exp.static(path.join(__dirname,"public"))); 
const ejsMate=require("ejs-mate");
const { default: mongoose } = require("mongoose");
app.engine("ejs",ejsMate);
const UserModel=require("./model/user_schema");
const doctModel=require("./model/doctorSchema");
const dummyUsers=require("./init/dummyUser");
const dummyDoct=require("./init/dummyDoctor");
const specialtyCategories=require("./init/speciality");
const { data } = require("react-router-dom");
const { text } = require("body-parser");
 let emailNpass=[];
async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/Doctor");
    }
    main().then(()=>{
        console.log("connected");
    }).catch((err)=>{
        console.log(err);
    });

app.listen(port,(req,res)=>{
      
    console.log(`Listening to Port:-${port}`);
});




//index route
app.get("/", async(req,res)=>{
   //setter(dummyDoct);
     //delDoctById("68e276fd74b3e3999c1e1874");
   res.render("main.ejs",{info});
 
});

app.get("/userAuth",(req,res)=>{
    res.render("userlogin.ejs");
     
});
app.post("/userAuth",(req,res)=>{
    console.log(req.body);
    const {email,password}=req.body;
    res.redirect("/");
});
app.get("/compAuth",(req,res)=>{
    res.render("compLogin.ejs");
});
app.post("/compAuth",(req,res)=>{
    console.log(req.body);
    const {email,password}=req.body;
    res.redirect("/");
});


app.get("/Userreg",(req,res)=>{
    res.render("register.ejs");
});
app.post("/Userreg",(req,res)=>{
    console.log(req.body);
    const {email,password}=req.body;
    res.redirect("/");
});



app.get("/doctorreg",(req,res)=>{
    emailNpass=[];
    res.render("doctreg.ejs");
});
/*app.post("/doctorreg",(req,res)=>{
    console.log(req.body);
    const {email,password}=req.body;
    res.redirect("/CompInfo");
});*/


app.get("/CompInfo",(req,res)=>{
    res.render("getDoctInfo",{GMapAPIkey,specialtyCategories});
});



app.post("/CompInfo",(req,res)=>{

    console.log("/CompInfo");

    //console.log(req.body);
    if(req.body.email && req.body.password){
    emailNpass.push(req.body.email);
    emailNpass.push(req.body.password);
    }

    console.log(emailNpass);
     let newInfo=req.body;
     

     if(req.body.firstname && emailNpass){

              const newComp=new doctModel({

                       email:emailNpass[0],
                       password:emailNpass[1],
                      name:`${newInfo.firstname} ${newInfo.lastname}`,
                      Experience:newInfo.Experience,
                      fees:newInfo.fees,
          
                      aboutMe:newInfo.aboutMe,
                      phoneNumber:newInfo.phone,

                      clinicName:newInfo.ClinicName,
          
                     clinicCord:{
                          lon:newInfo.lon,
                          lat:newInfo.lat,
                     },
                     Speciality:newInfo.specialty,
                     practice_Size:newInfo.size,
                     qualification:newInfo.qualification,
                     address:newInfo.compAdd,
                     opendays:{
                         startDay:newInfo.startDay,
                         endDay:newInfo.endDay,
                    
                     },

      
                     workinghrs:{
                          startTime:newInfo.startTime,
                         endTime:newInfo.endTime,
                    },
            });

            newComp.save().then((res)=>{
         console.log("New Company is added..");
         emailNpass=[];
        }).catch((e)=>{
            console.log(e);
        });
       
 
           res.redirect("/");
}

else{
    res.redirect("/CompInfo");
}
});


app.get("/help",(req,res)=>{
    res.render("help.ejs");
});



app.get("/find",async(req,res)=>{
    //const {name,Speciality,Experience,rating}=doctModel;
 const doctInfo=await doctModel.find({});
 roundoff(doctInfo);
  res.render("findDoctor.ejs",{doctInfo,specialtyCategories});
});


//filter and Search
app.post("/find",async(req,res)=>{
    let {Speciality,Experience,rating,doctName}=req.body;
    
   //giving priority for doctor name search
   if(doctName!=''){
      let doctInfo= await doctModel.find({name:{$eq: doctName}});
      roundoff(doctInfo);
      res.render("findDoctor.ejs",{doctInfo,specialtyCategories});
    } 
 
    //second prio speciality
   else if(Speciality!='Specialty' && doctName==''){
       let doctInfo= await doctModel.find({Speciality:{$eq: Speciality}});
      roundoff(doctInfo);
      res.render("findDoctor.ejs",{doctInfo,specialtyCategories});
   } 

   //thirdly experience
   else if(Experience!='Experience' && doctName=='' && Speciality=='Specialty'){
   
    let expYrslowerLimit=parseInt(Experience);
     let expYrsUppLimit=parseInt(Experience)==10? Infinity:parseInt(Experience)+5;
    // console.log(expYrslowerLimit," ",expYrsUppLimit);
      let doctInfo= await doctModel.find({});
      doctInfo=doctInfo.filter((p)=>{
        let doctExp=parseInt(p.Experience);
        return doctExp>=expYrslowerLimit && doctExp<=expYrsUppLimit ;
      })

      roundoff(doctInfo);
      res.render("findDoctor.ejs",{doctInfo,specialtyCategories});
   } 

   //4th prio by rating
      else if(rating!='Sort by Rating' && Speciality=='Specialty' && doctName=='' && Experience=='Experience' ){
       let doctInfo= await doctModel.find({});
      roundoff(doctInfo);
      doctInfo.forEach((ele)=>{
        if(ele.rating<parseInt(rating)){
         doctInfo.splice(doctInfo.indexOf(ele),1);
        }
      });
      res.render("findDoctor.ejs",{doctInfo,specialtyCategories});
   } 



  else{
        let doctInfo= await doctModel.find({});
        roundoff(doctInfo);
      res.render("findDoctor.ejs",{doctInfo,specialtyCategories});
  }  

});






app.get("/notify",(req,res)=>{
    res.render("notification.ejs");
});


app.get("/userProfile",(req,res)=>{
   res.render("userProfile.ejs");
});

//review//profile
app.get("/find/:id",async(req,res)=>{
  
   let info= await doctModel.findById(req.params.id);
   if(!info.website){ info.website="Xyz.com"};
    res.render("DoctorProfile.ejs",{info,GMapAPIkey});
});


//edit route
app.put("/find/:id",async(req,res)=>{
   
   let {clinicName,address,fees,lon,lat,website,aboutMe}=req.body;
  try{
     let doctInfo=await doctModel.findByIdAndUpdate(req.params.id,{
         clinicName:clinicName,
         fees:fees,
         address:address,
         clinicCord:{
            lon:lon,
            lat:lat,
         },
         website:website,
         aboutMe:aboutMe,
         },{new:true});
         console.log("Info update jhalli....:)");
        }

   catch(e){
      console.log("error has occoured..."+e)    
   }     
 
  res.redirect(`/find/${req.params.id}`);

});



//confirm N pay :>)
app.post("/find/:id/book",async(req,res)=>{
   let info=await doctModel.findById(req.params.id);
   let {fees,name,Speciality}=info;
    //const {name,comment}=req.body;
    res.render("ConfNPay.ejs",{fees,name,Speciality});
    
});


//map
app.get("/find/:id/map",async(req,res)=>{
   let coord= await doctModel.findById(req.params.id);
   let {clinicCord}=coord;
   let lon=clinicCord.lon;
   let lat=clinicCord.lat;
   let id=req.params.id
    res.render("showMap.ejs",{ GMapAPIkey,lat,lon,id});
});


//after  payment..





const setter=async(dummy)=>{
     await doctModel.insertMany(dummy).then(()=>{
    console.log("Data set successfully");
   }).catch((e)=>{
   console.log(e);
   });

}

const unsetter=async(dummy)=>{
     await doctModel.deleteMany(dummy).then(()=>{
    console.log("Data unset successfully");
   }).catch((e)=>{
   console.log(e);
   });
 
}

const delDoctById=async(id)=>{
  await doctModel.findByIdAndDelete(id);
  console.log(id," deleted");
};


//rounding off
let roundoff=(modeldata)=>{
 modeldata.forEach((x)=>{
   x.rating=Math.round(x.rating);
   if(x.rating<0){
    x.rating=0;
   }
});
}


//extracting digits from experience i.e 20+years=>20 or 3-4 years=>3
/*let isminus=(string)=>{
    for(int i=0;i<string.length;i++)
    if(string[])

}*/
//middelwares
app.use((req,res,next)=>{
  console.log(req.method,req.hostname,req.path);
});
