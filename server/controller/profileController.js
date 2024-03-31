import User from "../models/user.js"
import asyncHandler from "express-async-handler"
import { validateId } from "../utils/validateId.js"
import cookie from "../utils/cookie.js"


//get profile details of current user
// api/profile
export const profileUser = asyncHandler(async(req,res,next) => {
    const user = await User.findById(req.user._id)
    console.log ("######################")
    console.log(user)
    
    if(!user){
        res.status(404).json({
            error: "User not found"
        })
    }
    res.status(200).json({
        user,
    })
})


//Profile update
//api/updateProfile
export const updateProfile = asyncHandler(async(req,res,next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email
    }
    const user = await User.findByIdAndUpdate(req.user._id, newUserData, {new:true})
    res.status(200).json({
        user,
    })
})

//change password
// api/updatePassword
export const updatePassword = asyncHandler(async(req,res,next) => {
  const user = await User.findById(req.user._id).select("+password")
  //const oldPassword = req.body.oldPassword
  const isMatched = await user.comparePassword(req.body.oldPassword)
  if(!isMatched)
  {
    res.status(404).json({
        error: "Your old Password is incorrect"
    })
  }
  if(req.body.oldPassword === req.body.newPassword)
  {
    res.status(401).json({
        error: "Your old password is same as new password"
    })
  }
  else{
  user.password = req.body.newPassword
  user.save();
  res.status(200).json({
    message: "Your password is successfully changed",
    success: true
  })
}
})

//get All users
// api/admin/allusers
export const allUsers = asyncHandler(async(req,res,next) => {
    const user = await User.find()
    const userCount = user.length
    res.status(200).json({
        message: "List of all users",
        userCount,
        user,
    })
})

//get Single user details
// api/admin/allusers/:id

export const singleUserDetails = asyncHandler(async(req,res,next) => {

    const id = req.params.id
    let validate = true;
    validate = validateId(req.params.id)

    if(validate){
        const user = await User.findById(id)
    if(!user)
    {
        res.status(404).json({
            error: "User not found"
        })
    }
    res.status(200).json({
        message: "User found with this ID",
        user,
    })
}
else{
    res.status(404).json({
        error: "Invalid ID"
    })
}

 })

 //Update Single User
 // api/admin/allusers/:id

 export const updateSingleUser = asyncHandler(async(req,res,next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    } 
    let validate = true
    validate = validateId(req.params.id)

    if(validate){
    let user = await User.findById(req.params.id)

    if(!user)
    {
        res.status(404).json({
            error: "User not found"
        })
    }

    user = await User.findByIdAndUpdate(req.params.id, newUserData, {new:true})
     
          res.status(200).json({
            message: "User Details updated",
            user,
          })
    }

    else{
    res.status(404).json({
        error: "Invalid ID"
    })
}
 })


 //delete user
 //api/admin/allusers/:id

 export const deleteUser = asyncHandler(async(req,res,next) => {

    let validate = true
    validate = validateId(req.params.id)

    if(validate){
    let user = await User.findById(req.params.id)

    if(!user){
         
        res.status(404).json({
            error: "User not found"
        })
    }
    user = await User.findByIdAndDelete(req.params.id)

    res.status(200).json({
        message: "User deleted successfully",
        success: true,
        user,
    })
    }
    else{
        res.status(400).json({
            error: "Invalid ID"
        })
    }

 })

