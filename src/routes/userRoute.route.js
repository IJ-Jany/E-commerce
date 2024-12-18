import e from "express";
import { createUser,emailVerify,getUser,login,logout,resendEmail,userUpdate } from "../controllers/userController.controller.js";
import { validation } from "../middlewares/validation.middleware.js";
import {upload} from "../middlewares/multer.middleware.js"
import { auth } from "../middlewares/auth.middleware.js";
import { adminAuth } from "../middlewares/adminauth.middleware.js";
const router = e.Router()


router.route('/user/create').post( createUser)
router.route('/user/:id').get( getUser)
router.route('/user/verify/:link').get(emailVerify)
router.route("/user/resendmail").post(resendEmail)
router.route("/user/logout").post(auth, logout)
router.route("/user/update").post(auth, upload.single("profilepic"), userUpdate)
router.route("/user/login").post(login)




export default router