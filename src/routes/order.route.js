import e from "express";
import { auth } from "../middlewares/auth.middleware.js";
import { createOrder ,allOrders } from "../controllers/order.controller.js";

const router = e.Router()


router.route("/order/create").post(createOrder)

router.route("/order").get(allOrders)



export default router 