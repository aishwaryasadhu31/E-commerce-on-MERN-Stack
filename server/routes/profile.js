import express from "express"
import { allUsers, deleteUser, profileUser, singleUserDetails, updatePassword, updateProfile, updateSingleUser } from "../controller/profileController.js"; 
import { checkRoles, isauthenticated } from "../middleware/authorizeUser.js";
const router = express.Router();

router.route ("/profile").get(isauthenticated, profileUser);
router.route ("/updateProfile").post(isauthenticated, updateProfile);
router.route ("/updatePassword").post(isauthenticated, updatePassword);

//Admin
router.route ("/admin/allusers").get(isauthenticated, checkRoles("admin"), allUsers);
router.route ("/admin/allusers/:id").get(isauthenticated, checkRoles("admin"), singleUserDetails );
router.route ("/admin/allusers/:id").put(isauthenticated, checkRoles("admin"), updateSingleUser );
router.route ("/admin/allusers/:id").delete(isauthenticated, checkRoles("admin"), deleteUser );

export default router;