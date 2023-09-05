const { ContactModel } = require("../model/contact.model")


const getData = async(req,res)=> {
    // let query=req.query
    console.log(req.body.userID)
    try {
        const notes= await ContactModel.find({user_id:req.body.userID})
    res.status(200).send(notes) 
    } catch (error) {
        res.send({"err":error.message})
    }
}

const addData = async(req,res)=>{
    // const payload=req.body
    const {name,email,phone}=req.body
    try {
        if(!name ||!email || !phone){
            res.status(400);
            throw new Error("All Fields are mandatory !")
        }else {
            const user = new ContactModel({name,email,phone,user_id:req.body.userID})
            await user.save()
            res.status(200).send({"msg":"New user has been added","contact":user})
        }
        
    } catch (error) {
        res.send({"err":error.message})
    }
}

const delData = async(req,res)=> {
    const {ID}=req.params;
    try {
        let user= await ContactModel.findByIdAndDelete({_id:ID})
        if(!user){
            res.status(404);
            throw new Error("Contact not found");
        }
        if(user.user_id.toString()!==req.body.userID){
            res.status(403);
            throw new Error("User dont have permission to update other user contacts");

        }
    res.status(200).send({"msg":"Contact Deleted"}) 
    } catch (error) {
        res.send({"err":error.message})
    }
}

const getSingleData = async(req,res)=> {
    const {id}=req.params;
    try {
        let user= await ContactModel.findById(id)
        if(!user){
            res.status(404);
            throw new Error("Contact not found");
        }
        
    res.status(200).send(user) 
    } catch (error) {
        res.send({"err":error.message})
    }
}

const updateData = async(req,res)=> {
    const {ID}=req.params;
    const payload = req.body
    try {
        let user= await ContactModel.findByIdAndUpdate({_id:ID},payload)
        if(!user){
            res.status(404);
            throw new Error("Contact not found");
        }
        if(user.user_id.toString()!==req.body.userID){
            res.status(403);
            throw new Error("User dont have permission to update other user contacts");

        }
    res.status(200).send({"msg":"Contact Updated","Contact":user}) 
    } catch (error) {
        res.send({"err":error.message})
    }
}

module.exports={getData,addData,delData,getSingleData,updateData}