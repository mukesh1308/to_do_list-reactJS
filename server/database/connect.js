const mongoose=require("mongoose");

mongoose.connect(process.env.DATABASE)
.then(()=>{
    console.log("connected to database");
})
.catch((err)=>{
    console.log("error in connecting to the database");
})