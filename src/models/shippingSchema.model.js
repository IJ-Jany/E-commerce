import mongoose, {Schema} from "mongoose";
const shippingSchema = new Schema({
    sname: String,
    scountry:{
        type: String,
        default: "bangladesh"
    },
    address: String,
    city: String,
    district: String,
    postcode: String,
    phone: String,
    email: String,
    shippingCost: Number,
},{
    timestamps: true
})

export const  Shipping = mongoose.model("Shipping", shippingSchema)