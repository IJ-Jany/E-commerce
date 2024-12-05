import e from "express";
import { auth } from "../middlewares/auth.middleware.js";
import { adminAuth } from "../middlewares/adminauth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { createProduct ,deleteProduct, pagination} from "../controllers/product.controller.js";

const router = e.Router()


router.route("/product/create").post(upload.single('thumbnail'), upload.array('gallery'),createProduct)
router.route("/product/delete/:id").delete(deleteProduct)
router.route("/product").get(pagination)


export default router 