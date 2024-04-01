import Order from "../models/order.js"
import asyncHandler from "express-async-handler"
import { validateId } from "../utils/validateId.js"
import Product from "../models/product.js"

//create Order from admin
//api/admin/order

export const createOrder=asyncHandler(async(req,res,next)=>{
    const {orderItems,
        shippingInfo,
        itemsPrice,
        taxAmount,
        shippingAmount,
        totalAmount,
        paymentMethod,
        paymentInfo}= req.body;

        const order= await Order.create({orderItems,
            shippingInfo,
            itemsPrice,
            taxAmount,
            shippingAmount,
            totalAmount,
            paymentMethod,
            paymentInfo,
            user: req.user._id
        })


        res.status(200).json({
            message:"Order created successfully",
            order,
        })
})


//get login user orders
//api/profile/order

export const myOrders= asyncHandler(async(req,res,next)=>{
    const order=await Order.find({user:req.user._id})
    const orderLen=order.length;
     if(!order){
        res.status(400).json({
            error:"No Orders Found",
        })
     }

     res. status(200).json({
        message:`Here are the ${orderLen} orders you made with us`,
        order,

     })
})


//get particular order details
//api/order/:id

export const getOrderDetails= asyncHandler(async(req,res,next)=>{
    const order = await Order.findById(req.params.id).populate("user","name email")
    if(!order){
        res.status(400).json({
            error:"No Orders Found ",
        })
     }

     res.status(200).json({
        message:"Here is the update on your order",
        order
     })
})


//get all orders
//api/admin/allorders
export const getAllOrders= asyncHandler(async(req,res,next)=>{
    const order = await Order.find()
    const orderLen=order.length;
    if(!order){
        res.status(400).json({
            error:"No Orders Found ",
        })
     }

     res.status(200).json({
        message:"Here are all the orders",
        orderLen,
        order,
     })
})


//update a order from admin
//api/admin/order/:id

export const updateOrder= asyncHandler(async(req,res,next)=>{
    const order =await Order.findById(req.params.id)

    if(!order){
        res.status(404).json({
            error:"No Order is there"
        })
    }

    if(order.orderStatus==="Delivered"){
        res.status(200).json({
            message:"Your Order has already been Delivered"
        })
    }
//changing the product stock
    order.orderItems.forEach(async(item)=>{
        const product= await Product.findById(item.product.toString())

        if(!product){
            res.status(400).json({
                error:"No Products Found with this ID"
            })
        }
        
        product.stock=product.stock - item.quantity
        await product.save({validateBeforeSave:false})
    })

    order.orderStatus=req.body.orderStatus
    order.deliveredAt-Date.now()
    await order.save()

    res.status(200).json({
        success:true,
        message:"Order is updated",
        order
    })
})

//delete a order from admin
//api/admin/order:id

export const deleteOrder =asyncHandler(async(req,res,next)=>{
     let order = await Order.findById(req.params.id)

     if(!order){
        res.status(404).json({
            error:"No Order is there"
        })
    }
order= await Order.findByIdAndDelete(req.params.id)

res.status(200).json({
    success:true,
    message:"Order deleted successfully",
    order
})

})