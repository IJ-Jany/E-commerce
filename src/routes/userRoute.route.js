import e from "express";
import { validation } from "../middlewares/validation.middleware.js";
import { createUser, userUpdate } from "../controllers/userController.controller.js";
import { emailVerify } from "../controllers/userController.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
const router = e.Router()

router.route('/user').post(validation, createUser)
router.route('/user/:link').get(emailVerify)
router.route("/user/login").post(login)
router.route("/user/update").post(upload.single("profilepic"), userUpdate)


export default router