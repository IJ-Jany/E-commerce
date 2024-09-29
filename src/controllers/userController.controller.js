 import { User } from "../models/userSchema.model.js"
 import bcrypt from "bcrypt"
 import { mail } from "../utils/sendMail.js"
 const createUser = async (req,res)=>{
 const {displayname,email,password,phonenumber} = req.body
 const isFound = await  User.findOne({email})
if (isFound) {
  res.json("email done")
}
const bpass = await bcrypt.hash(password, 10);
const user = await User.create({displayname,email,password:bpass,phonenumber})
console.log(user);
await mail(user.email,"verification","hello","<h1>hello</h1>")
 res.json("ok")
 
}
export {createUser}