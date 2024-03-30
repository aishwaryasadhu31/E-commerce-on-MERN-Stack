import User from "../models/user.js"
import asynchandler from "express-async-handler"
import  jwt  from "jsonwebtoken"


export const isauthenticated = asynchandler(async(req,res,next) => {
    const {token} = req.cookies
    if(!token){
        res.status(404).json({
            error: "Login First to access these resource"
        })
    }
    const verifyToken = jwt.verify(token,process.env.JWT_SECRET)
    req.user = await User.findById(verifyToken.id)
    next();

})