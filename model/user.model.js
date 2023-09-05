const mongoose=require("mongoose")

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:[true,"Please add the contact name"],
    },
    email:{
        type:String,
        required:[true,"Please add the email address"],
        unique:[true,"Email address already taken"]
    },
    password:{
        type:String,
        required:[true,"Please add the password"],
    }
},
{timestamps:true,versionKey:false}
)

const userModel=mongoose.model("user",userSchema)

module.exports={userModel}