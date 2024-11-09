import apiResponse from "quick-response"
import {Variation} from "../models/VariationSchema.model"

const createVariation = async (req,res)=>{
    try {
        const {name} = req.body
        const variation = await Variation.create({name})
        return res.josn(apiResponse(201, "variation created", { variation}))
    } catch (error) {
        
    }
    }
    
    export {createVariation}