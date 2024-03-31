import express from "express"
import {forgotPassword, loginUser, logoutUser, registerUser, resetPassword} from "../controller/userControllers.js"
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/forgotPassword").post(forgotPassword);
router.route("/password/resetPassword").put(resetPassword);
//router.route ("/profile").get(profileUser);

export default router;