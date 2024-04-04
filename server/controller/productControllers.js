import Product from "../models/product.js"
import slug from "slugify"
import asyncHandler from "express-async-handler"
import { validateId } from "../utils/validateId.js"
import ApiFilter from "../utils/apiFilters.js"



//create a new single products
//api/admin/products
 export const createProduct= asyncHandler(async(req,res)=>{
    try{
    if (req.body.name)
    {
        req.body.slug = slug(req.body.name)
    }
    req.body.user = req.user._id

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
        const apiFilter= new ApiFilter(Product,req.query).search().filters();
        let products=await apiFilter.query
        let productLen=products.length;
        const prodPerPage=4;
        if(productLen===0)
        {
            res.status(200).json({
                message:`No Products found with the keyword ${req.query.keyword}`
            })
        }
        apiFilter.pagination(prodPerPage);
        products=await apiFilter.query.clone();
        res.status(200).json({
            prodPerPage,
            productLen,
            products,
        })
       
        // const allProducts=await Product.find();
        // res.status(200).json({
        //     allProducts,
        // })
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
            message: "Product Deleted"
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


//review product
// api/reviews

export const createReview = asyncHandler(async(req,res,next) => {
    const {rating, comment, productId} = req.body
    let validate = true
    validate = validateId(productId)

    if(validate)
    {
    const review = {user: req.user._id, rating: Number(rating), comment}
    const product = await Product.findById(productId)
    if(!product){
        res.status(404).json({
            error: "Product not found"
        })
    }
   // let isReviewed = false
    let isReviewed = false
    const validate = product.reviews.forEach((r) => {
        if(r.user.toString() === req.user._id.toString()){
        isReviewed = true;}
    else{
        isReviewed = false;}
    })

    if(isReviewed){
        product.reviews.forEach((rv) => {
            if(rv.user.toString() === req.user._id.toString())
            {
                rv.comment = comment
                rv.rating = rating
            }
        })
        

    }

    else{
        product.reviews.push(review)
        product.numOfReviews = product.reviews.length
    }

let count = 0;
product.reviews.forEach((r) => {
    if (!isNaN(parseInt(r.rating))) {
        count += parseInt(r.rating);
    }
});

if (product.reviews.length > 0) {
    product.ratings = count / product.reviews.length;
} else {
    product.ratings = 0; // or any default value you prefer
}

        await product.save({validateBeforeSave: false})

        res.status(200).json({
            success: true,
            message: "Your review is posted",
            review
        })
    }
    else{
        res.status(400).json({
            error: "Invalid ID"
        })
    }
})

//get product reviews
// api/reviews?id

export const getAllReviews = asyncHandler(async(req,res,next) => {

    let validate = true
    validate = validateId(req.query.id)

    if(validate){
    const product = await Product.findById(req.query.id)

    if(!product){
        res.status(404).json({
            error: "Product not found"
        })
    }
    const reviewCount = product.reviews.length
    const ratings = product.ratings
     res.status(200).json({
        success: true,
        message: "Here are the reviews of this product",
        reviewCount,
        ratings,
        reviews: product.reviews
     })
    }
    else{
        res.status(404).json({
            error: "Invalid Id"
        })
    }
})

//delete review from admin
// api/admin/review

export const deleteReview = asyncHandler(async(req,res,next) => {
    let product = await Product.findById(req.query.productId)
    if(!product){
     res.status(404).json({
            error: "Product not found"
        })
    }
   
    let reviews = product.reviews
    product.reviews.forEach(async(r)=> {
        if(r._id.toString()===req.query.id.toString()){
            r.deleteOne()
        }
    })

    const numOfReviews = product.reviews.length

    let count = 0;
product.reviews.forEach((r) => {
    if (!isNaN(parseInt(r.rating))) {
        count += parseInt(r.rating);
    }
});

if (product.reviews.length > 0) {
    product.ratings = count / product.reviews.length;
} else {
    product.ratings = 0; // or any default value you prefer
}
const ratings = product.ratings
reviews = product.reviews


await product.save({ validateBeforeSave: false})
res.status(200).json({
    success: true,
    message: "Here are the updated reviews of this product",
    numOfReviews,
    ratings,
    reviews,

 })

})