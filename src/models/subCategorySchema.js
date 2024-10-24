import mongoose, {Schema} from "mongoose";

const subcategorySchema = new Schema({
    name: {
        type: String,
        unique:true,
        require:true
    },
    slug:{
        type:String,
        unique: true,
        require:true
    },
    subCategory: {
        type:mongoose.Types.ObjectId,
        ref: "Category"
    }
},{timestamps: true})

export const subcategory = mongoose.model("subcategorySchema", subcategorySchema)