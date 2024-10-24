import e from "express";
import { auth } from "../middlewares/auth.middleware.js";
import { adminAuth } from "../middlewares/adminauth.middleware.js";
const router = e.Router()


router.route("/categories/create").post(auth,adminAuth, (req,res)=>{
    res.send("created")
})



export default router