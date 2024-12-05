import mongoose, {Schema} from "mongoose";
const productsSchema = new Schema({
    title:{
        type:String,
        required: true
    },
    slug: {
        type: String,
        unique: true
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: "Category",
        required:true
    },
    subcategory: {
        type: mongoose.Types.ObjectId,
        ref: "SubCategory",
        required:true
    },
    inventory:[
         {
        type: mongoose.Types.ObjectId,
        ref: "Inventory"
    }],
    thumbnail:{
        public_id:{
            type:String,
           // required:true 
        },
        imagePath:{
            type:String,
          //  required:true  
        }
    },
    gallery: [
      {
        public_id:{
            type:String
        },
        imagePath:{
            type:String
        }
      }
    ], 
    description:{
        type:String
    }
},{
    timestamps:true
})
export const Product = mongoose.model("Product", productsSchema)