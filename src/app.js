import express from "express"
import cors from "cors"
import userRouter from "./routes/userRoute.route.js"
import categoryRouter from "./routes/categoryroutes.js"
import subCategoryRouter from "./routes/subcategory.route.js"
import productRouter from "./routes/product.route.js"

const app = express();

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("./public"))
app.use(cors({
    origin:"*",
    credential:true
}))
app.use("/api/v1/",userRouter)
app.use("/api/v1/",categoryRouter )
app.use("/api/v1/",subCategoryRouter)
app.use("/api/v1/",productRouter)

export default app