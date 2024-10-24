import mongoose, {Schema} from "mongoose";

const categorySchema = new Schema({
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
        ref: "Subcategory"
    }
},{timestamps: true})

export const Category = mongoose.model("Category", categorySchema)