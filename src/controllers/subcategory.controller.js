import apiResponse from "quick-response"
import {  } from "../models/categorySchema.js"
import { SubCategory } from "../models/subCategorySchema.js"
import { Category } from "../models/categorySchema.js"

export  const subCategoryCreate = async(req,res)=>{
try {
    let newSlug
    const {name, slug, category} = req.body
    if(!(name && category) ){
       return res.json(apiResponse(400, "name and category are required"))
    }
    if (!slug) {
       newSlug = name.replace(" ", "-").toLowerCase()
    } else{
        newSlug = slug.replace(" ", "-").toLowerCase() 
    }
    const subCategory = await SubCategory.create({name, slug:newSlug, category})
    await Category.updateOne({_id:category},{$push:{subCategory:subCategory._id}})
    return res.json(apiResponse(201, "subCategory created",{subCategory}))
} catch (error) {
    console.log(error);
    
}
}

const allSubCategories = async (req,res) =>{
    try {
        const data = await SubCategory.find().populate("subCategory")
        return res.json(apiResponse(200, "all subcategories", {data} ))
    } catch (error) {
        
    }
}

export {subCategoryCreate, allSubCategories}