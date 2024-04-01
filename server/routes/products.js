import express from "express"
import {createProduct,  createReview,  deleteProduct,  deleteReview,  getAllReviews,  getProducts, productDetails, updateProduct } from "../controller/productControllers.js"
const router =express.Router();

import { isauthenticated, checkRoles } from "../middleware/authorizeUser.js";


 router.route("/admin/products").post(isauthenticated, checkRoles("admin"), createProduct);
 router.route("/allproducts").get(isauthenticated,checkRoles("admin"), getProducts);
 router.route("/allproducts/:id").get(isauthenticated,checkRoles("admin"), productDetails);
 router.route("/allproducts/:id").put(isauthenticated,checkRoles("admin"), updateProduct);
 router.route("/allproducts/:id").delete(isauthenticated,checkRoles("admin"), deleteProduct);


 //review routes

 router.route("/reviews").post(isauthenticated, createReview);
 router.route("/reviews").get(isauthenticated, getAllReviews);
 router.route("/admin/reviews").delete(isauthenticated, checkRoles("admin"),deleteReview);

 export default router;