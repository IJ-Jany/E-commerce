import e from "express";
import { auth } from "../middlewares/auth.middleware.js";
import { adminAuth } from "../middlewares/adminauth.middleware.js";
import { createVariation, getVariation } from "../controllers/variation.controller.js";
const router = e.Router()


router.route("/variations/create").post(auth,adminAuth,createVariation)
router.route("/variations").get(getVariation)



export default router 