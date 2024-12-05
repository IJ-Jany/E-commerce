import apiResponse from "quick-response"
import { Product } from "../models/productSchema.model.js"
import { cloudinaryUpload } from "../services/cloudinary.js"
import { Inventory } from "../models/inventorySchema.model.js"
//import { Promise } from "mongoose"

const createProduct = async (req,res)=>{
try {
   const {title,slug,category,subcategory}  = req.body
   const {thumbnail,gallery} = req.files
let imagepath = thumbnail[0].path
   
   
     
   if([title,category,subcategory].some((filled)=> filled === "")){
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
        return res.json(apiResponse(400, "slug must be unique"))
    }
    newSlug = slug.replaceAll(" ","-").toLowerCase() + "-" +  Date.now()
   }
   const {path} = thumbnail[0]
   
   
   const result = await cloudinaryUpload(imagepath, slug, "product")

  
   const product = new Product()
   if(req.files?.gallery){
      let publicId = ""
      const {gallery} = req.files
   const galleryimage = gallery.map((path)=>path.path)


      for (let image of galleryimage) {
         publicId = image.filename + Date.now() + '-' + Math.round(Math.random() * 1E9)
   const uploadedGalleryImage = await cloudinaryUpload(
           image.path,
           publicId,
            'product/gallery'
            )
            product.gallery.push({
               imagePath: uploadedGalleryImage.optimizeUrl,
               public_id: publicId,
            })
         }
      }
   product.title= title
   product.category= category
   product.subcategory = subcategory 
   product.slug = newSlug
   product.thumbnail.imagePath= result.optimizeUrl
   product.thumbnail.public_id = result.uploadResult.public_id
   await product.save()
 return res.json(apiResponse(201, "product created", {product}))
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
      const {page,limit, category, subcategory, price_s} = req.query
      let filter = {}

      if(category) {
         const categoryDoc = await Category.findOne({name: category})

         if(categoryDoc) {
            filter.category = categoryDoc._id;
         }
      }

      if(subcategory) {
         const subcategoryDoc = await SubCategory.findOne({name: subcategory})

         if(subcategoryDoc) {
            filter.subcategory = subcategoryDoc._id;
         }
      }




     let sortOrder = {};
     if (price_s === 'asc'){
      sortOrder['inventory.sellingPrice']=1;
     }else if (price_s === 'desc'){
      sortOrder['inventory.sellingPrice']=-1;
     }




      //const products = await Product.find(filter).populate({path:"category", select: "name"}).populate({path:"subcategory" , select: "name"})
      //return res.json({products})

      let currentPage = 1
      if(page < 1){
      const baseLimit = limit || 2
      const skip = Number(((currentPage - 1) * baseLimit))
      const products = await Product.find(filter).populate({path:"category", select: "name"}).populate({path:"subcategory" , select: "name"}).populate({path:"inventory", select:"sellingPrice quantity"})
      skip(skip).limit(baseLimit).sort({["inventory.sellingPrice"]:1})
      const totalProducts = await Product.countDocuments()
      const totalPages = Math.ceil((totalProducts / baseLimit)) 
      res.json({products, totalProducts, totalPages,baseLimit,currentPage})
     
       }else{
         currentPage = Number(page || 1)
         const baseLimit = limit || 2
         const skip = Number(((currentPage - 1) * baseLimit))
         const products = await Product.find(filter).populate({path:"category", select: "name"}).populate({path:"subcategory" , select: "name"}).populate({path:"inventory", select:"sellingPrice quantity"})
         skip(skip).limit(baseLimit).sort({["inventory.sellingPrice"]:1})
         const totalProducts = await Product.countDocuments()
         const totalPages = Math.ceil((totalProducts / baseLimit)) 
         res.json({products, totalProducts, totalPages,baseLimit,currentPage})
       }
      } catch (error) {
      
   }
}

export {createProduct, pagination, deleteProduct}