import express from "express"
import {createProduct,  deleteProduct,  getProducts, productDetails, updateProduct } from "../controller/productControllers.js"
const router =express.Router();




 router.route("/admin/products").post(createProduct);
 router.route("/allproducts").get(getProducts);
 router.route("/allproducts/:id").get(productDetails);
 router.route("/allproducts/:id").put(updateProduct);
 router.route("/allproducts/:id").delete(deleteProduct);


 export default router;