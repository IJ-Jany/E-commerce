import e from "express";
import { auth } from "../middlewares/auth.middleware.js";
import { adminAuth } from "../middlewares/adminauth.middleware.js";
import { categoryCreate, getCategory } from "../controllers/category.controller.js";
const router = e.Router()


router.route("/categories/create").post(auth,adminAuth,categoryCreate)
router.route("/categories").get(getCategory)


export default router 