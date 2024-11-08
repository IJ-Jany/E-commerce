import e from "express";
import { auth } from "../middlewares/auth.middleware.js";
import { adminAuth } from "../middlewares/adminauth.middleware.js";
import { categoryCreate } from "../controllers/category.controller.js";
import { createProduct } from "../controllers/product.controller.js";
const router = e.Router()


router.route("/product/create").post(upload.fields([{ name: 'thumbnail', macCount: 1}, {name: 'gallery', maxCount: 4}]),createProduct)



export default router 