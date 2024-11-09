import e from "express";
import { auth } from "../middlewares/auth.middleware.js";
import { adminAuth } from "../middlewares/adminauth.middleware.js";
import {createInventory} from "../controllers/inventory.controller.js"
const router = e.Router()


router.route("/inventory/create").post(auth,adminAuth, create)



export default router 