import mongoose, { Schema } from "mongoose";
const variationSchema = new Schema({
    name:{
        type: String
    }
},{timestamps})

const Variation = mongoose.model("Variation", variationSchema)

