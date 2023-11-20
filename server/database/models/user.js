const mongoose=require("mongoose");
const bcrypt=require("bcrypt");

const userSchema=mongoose.Schema({
    first_name:{
        type:String,
        uppercase:true,
        required:true,
        trim:true
    },
    last_name:{
        type:String,
        uppercase:true,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique: true,
        trim:true
    },
    passward:{
        type:String,
        required:true
    }
});

userSchema.pre("save",async function(next){
    try{2
        let hashPass=await bcrypt.hash(this.passward,10);
        this.passward=hashPass;
        next();
    }
    catch(err){
        throw new Error("passward hashing problem");
    }
});


const user=mongoose.model("user",userSchema);


module.exports=user;