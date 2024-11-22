import mongoose, {Schema} from "mongoose";

const SubCategorySchema = new Schema({
    name: {
        type: String,
        unique:true,
        require:true
    },
    slug:{
        type:String,
        unique: true
    },
    category: {
        type:mongoose.Types.ObjectId,
        ref: "Category"
    }
},{timestamps: true})

export const SubCategory = mongoose.model("SubCategory", SubCategorySchema)