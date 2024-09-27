import e from "express";
import { createUser } from "../controllers/userController.controller.js";
const router = e.Router()

router.route("/user").post("createUser")

export default router