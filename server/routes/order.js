import express from "express"
import { createOrder, deleteOrder, getAllOrders, getOrderDetails, myOrders, updateOrder } from "../controller/orderController.js";
import { isauthenticated, checkRoles } from "../middleware/authorizeUser.js";


const router =express.Router();
router.route("/order").post(isauthenticated,createOrder)
router.route("/profile/order").get(isauthenticated,myOrders)
router.route("/order/:id").get(isauthenticated,getOrderDetails)

//admin
router.route("/admin/allorders").get(isauthenticated,checkRoles("admin"),getAllOrders)
router.route("/admin/order/:id").put(isauthenticated,checkRoles("admin"),updateOrder)
router.route("/admin/order/:id").delete(isauthenticated,checkRoles("admin"),deleteOrder)


export default router;