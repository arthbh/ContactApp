const mongoose=require("mongoose")

const contactSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please add the contact name"],
    },
    email:{
        type:String,
        required:[true,"Please add the email address"],
    },
    phone:{
        type:String,
        required:[true,"Please add the phone number"],
    },
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    }
},
{timestamps:true,versionKey:false}
)

const ContactModel=mongoose.model("contact",contactSchema)

module.exports={ContactModel}