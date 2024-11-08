import mongoose, {Schema} from "mongoose";

const inventorySchema = new Schema({
    product:{
        type: mongoose.Types.ObjectId,
        ref: "Product"
    },
    variation:{
       type: mongoose.Types.ObjectId,
       ref: "Variation"
   },
   purchasePrice: Number,
   sellingPrice: Number,
   discountPrice: {
    price: {
        type:Number,
    },
    type: {
      type:String,
      enum: ["amount", "parcentage"]
    },
   }
},{ timestamps:true})

export const Inventory = mongoose.model("Inventory", inventorySchema)