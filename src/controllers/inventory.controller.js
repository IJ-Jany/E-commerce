import apiResponse from "quick-response"
import { Inventory } from "../models/inventorySchema.model.js"

const createInventory = async (req,res)=>{
    try {
       const {product, variation,purchasePrice,  sellingPrice, discountPrice, quantity}  = req.body
       if([product,variation,purchasePrice,sellingPrice,quantity].some((field) => field
    === "")) {
        return res.json(apiResponse(400, "all fields are required"))
    }
    const inventory = await Inventory.create({product,variation,purchasePrice,sellingPrice, discountPrice,quantity})
    await product.findByIdAndUpdate({_id: product}, { $push: { inventory: inventory._id}})
    return res.json(apiResponse(201, "Inventory craeted", {inventory}))
    } catch (error) {
        
    }
    }
    
    export {createInventory}