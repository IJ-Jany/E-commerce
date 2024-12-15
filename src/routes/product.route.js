import e from "express";
import { auth } from "../middlewares/auth.middleware.js";
import { adminAuth } from "../middlewares/adminauth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { createProduct ,deleteProduct, getProducts, pagination, singleProduct} from "../controllers/product.controller.js";

const router = e.Router()


router.route("/product/create").post(upload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'gallery', maxCount: 4 },
  ]),createProduct)
router.route("/product/delete/:id").delete(deleteProduct)
router.route("/product").get(pagination)
router.route("/products").get(getProducts)
router.route("/products/:slug").get(singleProduct)

export default router 