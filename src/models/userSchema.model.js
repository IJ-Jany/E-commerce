import {mongoose,Schema} from "mongoose";

const userSchema =  new Schema({
     displayname:{
        type:String,
        required:[true,"name is required"],
        trim:true
     },
     email:{ 
        type:String,
        required:[true,"email is required"],
        trim:true,
         unique:true,
         lowercase:true
     },
     password:{
        type:String,
        required:[true,"password is required"],
        minlegth:[8,"minimal length is 8"],
        select:false
     },
     phoneNumber:{
        type:String
     },
     emailVerified:{
        type:Date,
     },
     resetPasswrdToken:{
        type:String,
     },
     role:{
        type:String,
        lowercase:true,
        enum:["user", "seller","admin", "editor"],
        default: "user"
     },
     address:[
        {street:String}, {postalCode:String}, {district:String}, {
            country:String
        }
     ]
},{
    timestamps:true
})

export const User = mongoose.model("User", userSchema)