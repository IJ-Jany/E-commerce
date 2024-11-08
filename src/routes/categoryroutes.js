import e from "express";
import { auth } from "../middlewares/auth.middleware.js";
import { adminAuth } from "../middlewares/adminauth.middleware.js";
import { categoryCreate } from "../controllers/category.controller.js";
const router = e.Router()


router.route("/categories/create").post(auth,adminAuth,categoryCreate)



export default router 