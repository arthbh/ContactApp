const { userModel } = require("../model/user.model");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


const registerUser = async(req,res)=> {
    const {username,email,password}=req.body
    try {
        if(!username || !email || !password){
            res.status(400);
            throw new Error("All fiels are mandatory !")
        }

        const userAvailable = await userModel.findOne({email})
        if(userAvailable){
            res.status(400);
            throw new Error("User already registered !") 
        }else {
            // Hash Password
            // const hashedPassword= await bcrypt.hash(password,10);
            // console.log(hashedPassword)
  // HASHED PASSWORD
  bcrypt.hash(password, 5, async(err, hash)=> {
    const user=new userModel({username,email,password:hash})
    await user.save()
    if(user){
        res.status(201).send({"msg":"Registartion successfull!",_id:user.id,email:user.email})
    }else {
        res.status(400)
        throw new Error("User data is not valid")

    }
    // res.status(201).send({})
});//



            // const user = new userModel({username,email,password})
            // await user.save()
            // res.status(200).send(user)
        }
        
    } catch (error) {
    res.send({"msg":error.message});
        
    }
    // res.json({message:"Register the user"});
}
const loginUser = async(req,res)=> {
    const {email,password}=req.body
    try {
        if(!email || !password){
            res.status(400);
            throw new Error("All fiels are mandatory !")
        }
        const user = await userModel.findOne({email})
        // console.log(user);
        if(user){
            bcrypt.compare(password,user.password, (err, result) => {
                if(result){
                    res.status(200).send({"msg":"Login successfull!","token":jwt.sign({"userID":user._id},process.env.SECRET_KEY)}) // instead of {"foo":"bar"} payload we can make use by passing the id as payload to create an unique token.
                } else {
                    res.status(400).send({"msg":"Wrong Credentials"})
                } 
            });
        }
    } catch (error) {
        res.json({"msg":error.message});
    }

}
// private
const currentUser = async(req,res)=> {
    // res.json(req)
    console.log(req.body)

    res.json({message:"Current user","user":req.body});
}


module.exports={registerUser,loginUser,currentUser}