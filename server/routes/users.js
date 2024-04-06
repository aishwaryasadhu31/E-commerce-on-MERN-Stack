import express from "express"
import {forgotPassword, loginUser, logoutUser, registerUser, resetPassword, uploadAvatar} from "../controller/userControllers.js"
import { isauthenticated } from "../middleware/authorizeUser.js";
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/forgotPassword").post(forgotPassword);
router.route("/password/resetPassword").put(resetPassword);


//cloudinary avatar upload

router.route("/profile/uploadAvatar").put(isauthenticated, uploadAvatar);


export default router;