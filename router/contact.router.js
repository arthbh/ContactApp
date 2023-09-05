const express=require("express")
const contactRouter=express.Router();

const { getData, addData, delData, getSingleData, updateData } = require("../controllers/contact.controller");
const { validateToken } = require("../middleware/vaildatoken");


contactRouter.use(validateToken)
contactRouter.get("/",getData).post("/",addData)

contactRouter.get("/:id",getSingleData)

contactRouter.put("/:userID",updateData).delete("/:userID",delData)
// userRouter.delete("/:userID",delData)

// userRouter.post("/add",addData)


module.exports={contactRouter}
