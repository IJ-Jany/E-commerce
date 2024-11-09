import e from "express";
import { auth } from "../middlewares/auth.middleware.js";
import { adminAuth } from "../middlewares/adminauth.middleware.js";
import {createInventory, updateInventory, allInventory,deleteById} from "../controllers/inventory.controller.js"

const router = e.Router()


router.route("/inventory/create").post(auth,adminAuth, createInventory)
router.route("/inventory/update/:id").post(auth,adminAuth, updateInventory)
router.route("/inventory/").get(auth,adminAuth, allInventory)
router.route("/inventory/:id").delete(auth,adminAuth, deleteById)

export default router 