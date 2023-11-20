const mongoose=require("mongoose");

const ToDoSchema=mongoose.Schema({
    user_id:{
        type:String,
        required:true
    },
    data:[
        {
            list_id:String,
            tital:String,
            content:{
                type:String,
                lowercase:true
            },
            status:{
                type:Boolean,
                default:false
            }
        }
    ]
});

const ToDo=mongoose.model("to_do",ToDoSchema);

module.exports=ToDo;