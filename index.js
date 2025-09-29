require("dotenv").config();
const GMapAPIkey=process.env.GOOGLE_CLOUD_API_KEY;

const exp=require("express");
const app=exp();
const port=3000;
const info=require("./init/info");
const ejs=require("ejs");
const path=require("path");
app.set('view engine','ejs');
app.use(exp.urlencoded({ extended: true })); 
app.set("views",path.join(__dirname,"views"));
app.use(exp.static("pubic"));
app.use(exp.static(path.join(__dirname,"public")));
const ejsMate=require("ejs-mate");
const { default: mongoose } = require("mongoose");
app.engine("ejs",ejsMate);
const UserModel=require("./model/user_schema");
const doctModel=require("./model/doctorSchema");
const dummyUsers=require("./init/dummyUser");

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
     /*await UserModel.insertMany(dummyUsers).then(()=>{
    console.log("Data set successfully");
   }).catch((e)=>{
   console.log(e);
   });
 await UserModel.deleteMany({}).then(()=>{
    console.log("Data set successfully");
   }).catch((e)=>{
   console.log(e);});*/
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
    res.render("doctreg.ejs");
});
app.post("/doctorreg",(req,res)=>{
    console.log(req.body);
    const {email,password}=req.body;
    res.redirect("/CompInfo");
});


app.get("/CompInfo",(req,res)=>{
    res.render("getDoctInfo",{GMapAPIkey});
});
app.post("/CompInfo",(req,res)=>{
     console.log(req.body);
    res.redirect("/");
})
app.get("/help",(req,res)=>{
    res.render("help.ejs");
});

app.get("/find",(req,res)=>{
    res.render("findDoctor.ejs");
});

app.get("/notify",(req,res)=>{
    res.render("notification.ejs");
});


app.get("/userProfile",(req,res)=>{
   res.render("userProfile.ejs");
});

//review
app.get("/doctProfile",(req,res)=>{
    res.render("DoctorProfile.ejs");
});
app.post("/doctProfile",(req,res)=>{
    console.log(req.body);
    //const {name,comment}=req.body;
    res.redirect("/doctProfile");
    
});

app.get("/map",(req,res)=>{
    res.render("showMap.ejs",{ GMapAPIkey });
});