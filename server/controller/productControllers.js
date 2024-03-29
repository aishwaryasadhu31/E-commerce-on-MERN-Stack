import Product from "../models/product.js"
import slug from "slugify"
import asyncHandler from "express-async-handler"
//import ErrorHandler from "../middleware/errorHandler.js"
//import catchAsyncError from "../middleware/catchAsyncError.js"
import { validateId } from "../utils/validateId.js"
//import { errorHandler } from "../middleware/errorHandler.js"

//create a new single products
//api/admin/products
 export const createProduct= asyncHandler(async(req,res)=>{
    try{
    if (req.body.name)
    {
        req.body.slug = slug(req.body.name)
    }

    const newProduct = await Product.create(req.body)
    res.status(200).json({
        newProduct,
    })
 
    //console.log("Product is created");
}
catch(err){
    throw new Error(err);
}

})

 
//get products
//api/getproducts

export const getProducts= asyncHandler(async(req,res)=>{
    try{
        const allProducts=await Product.find();
        res.status(200).json({
            allProducts,
        })
    }
    catch(err)
    {
        throw new Error(err);
    }
})


//get single product details with :id
//api/allproducts/:id

export const productDetails= asyncHandler(async(req,res,next)=>{
    const id = req.params.id
let validate = true
validate =  validateId(id);


if (validate)
{
    const product=await Product.findById(req.params.id)

    if(!product)
    {
       // return next(new errorHandler ("Product Not Found", 404))
        res.status(404).json({
            error:"Product not found"
        })

    }
    else{
        res.status(200).json({
            product,
        })
    }
    }
    else{
        // console.log("Invalid Id")
         res.status(404).json({
             error: "Invalid Id"
         })
    }
})


//update a single product
//api/allproducts/:id


export const updateProduct= asyncHandler(async(req,res,next)=>{
const id = req.params.id
let validate = true
validate =  validateId(id);


if (validate)
{
    let product=await Product.findById(req.params.id)

    if(!product)
    {
       // return next (new ErrorHandler ("Product Not Found", 404));
         return res.status(404).json({
            error:"Product not found"
        })

    }
        product=await Product.findByIdAndUpdate(req.params.id,req.body,{new:true});

        res.status(200).json({
            product,
        })
    }
    else{
       // console.log("Invalid Id")
        res.status(404).json({
            error: "Invalid Id"
        })
}
})


//delete a product
//api/allproduct/:id

export const deleteProduct = asyncHandler(async(req,res,next)=>{
    const id = req.params.id
let validate = true
validate =  validateId(id);


if (validate)
{

    let product = await Product.findById(req.params.id);

    if(!product)
    {
        //return next (new errorHandler ("Product Not Found", 404));
        return res.status(404).json({
            error:"Product Not Found"
        })
    }

    else{
        product =await Product.findByIdAndDelete(req.params.id,{new:true})

        res.status(200).json({
            product,
        })
    }
}

else{
  // console.log("Invalid Id")
    res.status(404).json({
        error: "Invalid Id"
    })
}
})
