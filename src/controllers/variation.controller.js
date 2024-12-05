import apiResponse from "quick-response"
import { Variation } from "../models/VariationSchema.model.js"

const createVariation = async (req,res)=>{
    try {
        const {sizename, category, color} = req.body
        const variation = await Variation.create({size: {sizename, category}, color})
        return res.json(apiResponse(201, "variation created", { variation}))
    } catch (error) {
        console.log("error", error);
        
    }
    }

    const getVariation = async (req,res)=> {
        const variation = await Variation.find()
        return res.json(apiResponse(200, "variation list", {variation}))
    }
    
    export {createVariation, getVariation}