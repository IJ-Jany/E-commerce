import e from "express";
import { auth } from "../middlewares/auth.middleware.js";
import { adminAuth } from "../middlewares/adminauth.middleware.js";
import { allSubCategories, subCategoryCreate } from "../controllers/subcategory.controller.js";
const router = e.Router()


router.route("/subcategories/create").post(auth,adminAuth,subCategoryCreate)
router.route("/subcategories").get(allSubCategories)


export default router 