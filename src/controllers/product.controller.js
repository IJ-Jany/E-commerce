import apiResponse from "quick-response"
import { Product } from "../models/productSchema.model.js"
import { cloudinaryUpload } from "../services/cloudinary.js"
import { Inventory } from "../models/inventorySchema.model.js"

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
   const {path} = thumbnail[0]
   const result = await cloudinaryUpload(path, slug, "product")

   const product = new Product()
   if(req.files?.gallery){
      let public_id
      const {gallery} = req.files
      const galleryImages = gallery.map((item)=> item)

      for (let image of galleryImages){
         public_id = image.fieldename + Date.now() + '-' + Math.round(Math.random() *  1E9)
         const uploadGalleryImage = await cloudinaryUpload(
            image.path,
            public_id,
            'product/gallery'
         )
         product.gallery.push({
            imagePath: uploadGalleryImage.optimizeUrl,
            public_id: public_id,
         })
      }
   }


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

const deleteProduct= async (req,res)=>{
   try{
      const{id} = req.params
      await Inventory.deleteMany({product:id})
      await Product.findByIdAndDelete({_id:id})
      res.json("delete")
   }catch (error){
      console.log(error);
      
   }
}

const pagination = async (req,res)=>{
   try {
      const {page,limit} = req.query
      let filter = {}
      let currentPage = 1
      if(page < 1){
      const baseLimit = limit || 2
      const skip = Number(((currentPage - 1) * baseLimit))
      const products = await Product.find().skip(skip).limit(baseLimit)
      const totalProducts = await Product.countDocuments()
      const totalPages = Math.ceil((totalProducts / baseLimit)) 
      res.json({products, totalProducts, totalPages,baseLimit,currentPage})
     
       }else{
         currentPage = Number(page || 1)
         const baseLimit = limit || 2
         const skip = Number(((currentPage - 1) * baseLimit))
         const products = await Product.find().skip(skip).limit(baseLimit)
         const totalProducts = await Product.countDocuments()
         const totalPages = Math.ceil((totalProducts / baseLimit)) 
         res.json({products, totalProducts, totalPages,baseLimit,currentPage})
       }} catch (error) {
      
   }
}

export {createProduct, pagination}