import e from "express";
import { auth } from "../middlewares/auth.middleware.js";
import { createCart, updateQuantity } from "../controllers/cart.controller.js";
const router = e.Router()


router.route("/cart/create").post(createCart)
router.route("/cart/update").post(updateQuantity)


export default router 