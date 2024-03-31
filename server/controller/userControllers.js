import User from "../models/user.js"
import asyncHandler from "express-async-handler"
import { validateId } from "../utils/validateId.js"
import cookie from "../utils/cookie.js"
import { getResetPasswordTemplate } from "../utils/emailTemplates.js"
import sendEmail from "../utils/sendEmail.js"
import crypto from "crypto"

//creating Register User
// api/register
export const registerUser = asyncHandler(async(req,res,next) => {
const {name,email,password,role} = req.body

//const user = await User.create({ name, email, password, role})
try{
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
}
catch(err){
    // let error = {
    //     statusCode: err.statusCode || 500,
    //     message: err.message || "Internal Server Error"
    // }
    if(err.code === 11000){
        let message = `Duplicate ${Object.keys(err.keyValue)} entered. ${email} already exists` 
        res.status(400).json({
            //error: "User exists"
            message,
        })
    }    

}
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

export const forgotPassword = asyncHandler(async(req,res,next) => {
    const user = await User.findOne({email: req.body.email})
    if(!user){
        res.status(404).json({
            error: "User not found"

        })    
    }
    const sendToken = await user.sendResetPasswordToken();
    await user.save()
    const resetUrl = `${process.env.url}/api/password/reset/${sendToken}`
    const message = user.getResetPasswordTemplate(user.name, resetUrl)

    try {
        await sendEmail({
          email: user.email,
          subject: "goCart Password Recovery",
          message,
        });
    
        res.status(200).json({
          message: `Email sent to: ${user.email}`,
        });
      } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
    
        await user.save();
        return next(res.status(500).json({
            error: "Link Expired. Try again"

        })
        );
      }
    });

// Reset password   =>  /api/v1/password/reset/:token
export const resetPassword = asyncHandler(async (req, res, next) => {
  // Hash the URL Token
  const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      res.status(404).json({
        error: "Password reset token is invalid or has been expired"
      })
        
      )
}

  if (req.body.password !== req.body.confirmPassword) {
    return next(res.status(404).json({
        error: "Passwords does not match"
    })
    )
  }

  // Set the new password
  user.password = req.body.password;

  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  cookie(user, 200, res);
});
