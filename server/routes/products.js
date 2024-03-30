import express from "express"
import {createProduct,  deleteProduct,  getProducts, productDetails, updateProduct } from "../controller/productControllers.js"
const router =express.Router();

import { isauthenticated } from "../middleware/authorizeUser.js";


 router.route("/admin/products").post(isauthenticated,createProduct);
 router.route("/allproducts").get(isauthenticated,getProducts);
 router.route("/allproducts/:id").get(isauthenticated, productDetails);
 router.route("/allproducts/:id").put(isauthenticated, updateProduct);
 router.route("/allproducts/:id").delete(isauthenticated, deleteProduct);


 export default router;