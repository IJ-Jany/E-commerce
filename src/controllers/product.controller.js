import apiResponse from "quick-response"
import { Product } from "../models/productSchema.model.js"
import { cloudinaryUpload } from "../services/cloudinary.js"

const createProduct = async (req,res)=>{
try {
   const {title,slug,category,subcategory}  = req.body
   const {thumbnail} = req.file
   if([title,category,subcategory].some((filled)=> filled == "")){
    return res.json(apiResponse(400, "all feilds are required"))
   }
   if (!thumbnail) {
return res.json(apiResponse(400, "thumbnail is required"))
   }
   let newSlug
   if (!slug){
    newSlug = title.replaceAll(" ","-").toLowerCase() + "-" +  Date.now()
   }else{
    const isSlugUnique = await Product.find({ slug})
    if(isSlugUnique){
        return res.json(apiResponse(400, "slug must be ubique"))
    }
    newSlug = slug.replaceAll(" ","-").toLowerCase() + "-" +  Date.now()
   }
   const {path} = thumbnail[0 ]
   const result = await cloudinaryUpload(path, slug, "product")
   const product = new Product()
   product.title= title
   product.category= category
   product.subcategory = subcategory 
   product.thumbnail.imgPath= result.optimizeUrl
   product.thumbnail.public_id = result.uploadResult.public_id
   await product.save()
res.json(apiResponse(201, "product created", {product}))
} catch (error) {
   console.log(error);
    
}
}

export {createProduct}