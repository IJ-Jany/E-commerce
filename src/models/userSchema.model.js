import mongoose,{Schema} from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
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
     profilePic: {
      type:String,
     },
     password:{
        type:String,
        required:[true,"password is required"],
        minlegth:[8,"minimal length is 8"]
     },
     phonenumber:{
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
     ],
     refreshToken:{
      type: String
     }
},{
    timestamps:true
})

userSchema.pre("save", async function(next){
   if(this.isModified('password')){
      this.password = await  bcrypt.hash(this.password, 10)
   }
   next()
})

userSchema.methods.checkPassword = async function (mypassowrd) {
 return await  bcrypt.compare(mypassword, this.passowrd) 
}

userSchema.methods.generateAccessToken = async function () {
 return  jwt.sign({
      id:this._id,
      email:this.email,
      displayName : this.displayName
    }, process.env.ACCESS_TOKEN_SC, { expiresIn: process.env.ACCESS_TOKEN_EX });
}

userSchema.methods.generateRefreshToken = async function () {
   return  jwt.sign({
        id:this._id,
        email:this.email,
        displayName : this.displayName
      }, process.env.REFRESH_TOKEN_SC, { expiresIn: process.env.REFRESH_TOKEN_EX });
  }

  userSchema.methods.AccessTokenVerify = async  function (token) {
 return jwt.verify(token,process.env.ACCESS_TOKEN_SC, function (err,decoded){
   if (err ) {
      return null
   } 
      return decoded
   });
 }

export const User = mongoose.model("User", userSchema)