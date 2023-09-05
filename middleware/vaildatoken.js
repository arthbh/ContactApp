
const jwt=require("jsonwebtoken")

const validateToken = async(req,res,next) => {
    // let token
    // let authHeader = req.headers.Authorization
    const token=req.headers.authorization//.split(" ")[1]

    if(token){
        const decoded=jwt.verify(token,process.env.SECRET_KEY)
        if(decoded){
            console.log(decoded); 
            req.body.userID=decoded.userID
            // req.user=decoded.user
            next();
        }else {
            res.status(400).send({"msg":"Please Login First"})
        }
    }else {
        res.status(400).send({"msg":"Please Login First"})
    }
} 
module.exports={validateToken}