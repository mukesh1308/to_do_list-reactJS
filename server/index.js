require("dotenv").config();
const express=require("express");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const cors=require("cors");
const {nanoid}=require("nanoid");
const user=require("./database/models/user.js");
const ToDo=require("./database/models/ToDo.js");
const auth=require("./auth");
require("./database/connect.js");


const port=process.env.PORT || 700;
const app=express();
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());


//! registration
app.post("/signUP",async(req,res)=>{
    try{
        if((await user.findOne({email:req.body.email}))!==null){
            res.status(406);
            res.send({data:"email is already registered"});
            return;
        }
        let new_user=new user(req.body);
        await new_user.save();
        let id=(await user.findOne({email:req.body.email}))._id;
        let new_toDo=new ToDo({user_id:id,data:[]});
        new_toDo.save();
        res.status(200);
        res.json({data:"done"});
    }
    catch(err){
        res.status(500);
        console.log(err);
        res.json({data:"error"});
    }
});


//! logIn
app.post("/logIN",async(req,res)=>{
    try{
        let user_data=await user.findOne({email:req.body.email});
        if(user_data==null){
            res.status(401);
            res.json({data:"new user,try sign up first"});
            return;
        }
        let match=await bcrypt.compare(req.body.passward,user_data.passward);
        if(match){
            let token=await jwt.sign({id:user_data._id},process.env.SECURITY_KEY);
            res.json({data:token});
        }
        else{
            res.status(401);
            res.send({data:"invalid password"});
        }
    }
    catch(err){
        res.status(500);
        res.json({data:"error"});
    }
});


//! token verification
app.get("/verify",auth,async(req,res)=>{
    try{
        res.status(200);
        res.json({data:"done"});
    }
    catch(err){
        res.status(500);
        res.json({data:"error"});
    }
});


//! adding event to a todo list
app.post("/add_to_do",auth,async(req,res)=>{
    try{
        let to_do_list={
            list_id:nanoid(),
            tital:req.body.tital,
            content:req.body.content
        }
        await ToDo.updateOne({user_id:req.user_id},{$push:{data:to_do_list}});
        res.status(200);
        res.json({data:"done"});
    }
    catch(err){
        res.status(500);
        res.json({data:"error"});
    }
});

//! marking done in to do list
app.put("/done",auth,async(req,res)=>{
    try{
        await ToDo.updateOne({user_id:req.user_id,"data.list_id":req.body.list_id},{$set:{"data.$.status":true}});
        res.status(200);
        res.json({data:"done"});
    }
    catch(err){
        res.status(500);
        res.json({data:"error"});
    }
});

app.delete("/remove",auth,async(req,res)=>{
    try{
        await ToDo.updateOne({user_id:req.user_id},{$pull:{data:{list_id:req.body.list_id}}});
        res.status(200);
        res.json({data:"done"});
    }
    catch(err){
        res.status(500);
        res.json({data:"error"});
    }
})

//! get to do list
app.get("/list",auth,async(req,res)=>{
    try{
        let data=await ToDo.findOne({user_id:req.user_id});
        res.status(200);
        res.json({data:data.data});
    }
    catch(err){
        res.status(500);
        res.json({data:"error"});
    }
});

app.get("/user",auth,async(req,res)=>{
    try{
        let data=await user.findOne({_id:req.user_id},{_id:false,passward:false,__v:false});
        res.status(200);
        res.json({data:data});
    }
    catch(err){
        res.status(500);
        res.json({data:"erroe"});
    }
})

app.listen(port,()=>{
    console.log("listening to port "+port);
})