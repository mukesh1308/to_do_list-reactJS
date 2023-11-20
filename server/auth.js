const jwt=require("jsonwebtoken");
const user=require("./database/models/user");

const auth=async(req,res,next)=>{
    try{
        let user_id=jwt.verify(req.headers.key,process.env.SECURITY_KEY).id;
        if((await user.findOne({_id:user_id}))!=null){
            req["user_id"]=user_id;
            next();
        }
        else{
            res.status(401);
            res.json({data:"invalid"});
        }
    }
    catch(err){
        res.status(401);
        res.json({data:"invalid"});
    }
}

module.exports=auth;