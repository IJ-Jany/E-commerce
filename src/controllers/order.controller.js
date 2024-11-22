import { Order } from "../models/orderSchema.model.js"
import { Shipping } from "../models/shippingSchema.model.js"
import apiResponse from "quick-response"
import { v4 as uuidv4} from "uuid"
const createOrder = async (req,res)=>{
    try {
        const {total, subtotal,name,address, city, district, postcode,phone, email, shippingCost, paymentType, orderedproducts, isShipping, sname,saddress, scity, sdistrict, spostcode,sphone, semail}= req.body
        const orderid = uuidv4()
        const orderDetails= new Order()
        const shippingDetails = await Shipping.create({sname, saddress, scity, sdistrict, spostcode,sphone, semail })
        if(isShipping){
         
            
            
            orderDetails.total = total;
            orderDetails.subTotal = subtotal;
            orderDetails.postcode = postcode;
            orderDetails.name = name;
            orderDetails.address = address;
            orderDetails.city = city;
            orderDetails.district = district;
            orderDetails.phone = phone;
            orderDetails.email = email;
            orderDetails.shippingCost = shippingCost;
            orderDetails.paymentType = paymentType;
            orderDetails.orderedproducts = orderDetails;
            orderDetails.shipping = shippingDetails._id
            orderDetails.orderId = orderid
            await orderDetails.save()
        }else{
            orderDetails.total = total;
            orderDetails.subTotal = subtotal;
            orderDetails.postcode = postcode;
            orderDetails.name = name;
            orderDetails.address = address;
            orderDetails.city = city;
            orderDetails.district = district;
            orderDetails.phone = phone;
            orderDetails.email = email;
            orderDetails.shippingCost = shippingCost;
            orderDetails.paymentType = paymentType;
            orderDetails.orderedproducts = orderDetails;
            orderDetails.shipping = shippingDetails._id
            orderDetails.orderId = orderid
            await orderDetails.save()
        }
        return res.json(apiResponse(201, "order done", {orderDetails}))

    } catch (error) {
       console.log(error);
        
    }
}

const allOrders = async (req,res)=>{
    try {
        const allOrders = await Order.find().populate("user").populate("shipping").populate("orderedproducts.product").populate("orderedproducts.inventory")
        return res.json(apiResponse(200, "all order",{allOrders}))
    } catch (error) {
        console.log(error);
        
    }
}

export {createOrder, allOrders}