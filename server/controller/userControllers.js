import User from "../models/user.js"
import asyncHandler from "express-async-handler"
import { validateId } from "../utils/validateId.js"
import cookie from "../utils/cookie.js"

//creating Register User
// api/register
export const registerUser = asyncHandler(async(req,res,next) => {
const {name,email,password,role} = req.body

let passwordLen = password.length
if(passwordLen <= 5)
{
    res.status(400).json({
        message: "Password is too short it should be greater than 6 character"
    })
}
const user = await User.create({ name, email, password, role})
const token = user.getJwtToken()

cookie(user, 200, res)
    res.status(200).json({
       message: "User is created", 
    })
})


//login
// api/login

export const loginUser = asyncHandler(async(req,res,next) => {
    const {email,password} = req.body

    if(!email || !password)
    {
        res.status(400).json({
            error: "Please enter Email and Password"
        })
    }

        const user = await User.findOne({email}).select("+password")
        const token = await user.getJwtToken();

        if(!user)
        {
            res.status(401).json({
                error: "User not found. Check Email and Password"
            })

        }

        const isMatched = await user.comparePassword(password)
        if(!isMatched){
            res.status(401).json({
                error: "Password is incorrect"
            })
        }
        cookie(user, 200, res)
        res.status(200).json({
            message: "Login Successfully",
            token,
        })
})


//logout user
// api/logout

export const logoutUser = asyncHandler(async(req,res,next) => {
    res.cookie ("token", null, {
        expires: new Date(
            Date.now()),
        httpOnly: true,
    })
    res.status(200).json({
        message: "Logged Out Successfully"
    })
})

