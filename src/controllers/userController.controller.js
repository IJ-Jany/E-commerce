 import { User } from "../models/userSchema.model.js"

 import { mail } from "../utils/sendMail.js"
import { verificationTemplate } from "../mailTemp/verificationTemplate.js"
import { cloudinaryUpload } from "../services/cloudinary.js"
import apiResponse from "quick-response"

const generateTokens = async (id) => {
    try {
   const user = await User.findById({ _id:id })
    const accessToken =await user.generateAccessToken()
    const refreshToken = await user.generateRefreshToken()
    user.refreshToken = refreshToken
    await user.save()
    return { accessToken, refreshToken}
    } catch (error) {
console.log(error);

    }
}
 const createUser = async (req,res)=>{
    const {displayname,email,password,phonenumber,role} = req.body
    try {
 const isFound = await  User.findOne({email})

if (isFound) {
 return  res.send("email already exist")
}
let user
if(role){
     user = await User.create({displayname,password,email,phonenumber,role})
}else{
     user = await User.create({displayname,password,email,phonenumber})
}

const link = await user.generateAccessToken(user._id)
await mail(user.email,"verification","hello",verificationTemplate(link))
 return res.send(apiResponse(201, "user created",user))
 
} 
 catch (error) {
       console.log(error.message);
        
    }
}

const emailVerify = async (req,res) =>{
    try {
    const {link} = req.params
    const user = new User()
    const result = await user.AccessTokenVerify(link)


    if (result) {
        const userFound = await User.findOne({email:result.email})
        if (userFound) {
            userFound.emailVerified = Date.now()
            await userFound.save()
           return res.send("verified")
        } else {
            res.send("invalid") 
        }   
    }else{
      return  res.send("invalid url") 
    }
    res.send("ok")
} catch (error){
    console.log("verify error", error);
    
}
} 

const  login = async(req,res)=>{
    try {
        const {email,password} =req.body 
        console.log(email,password);
        
        if (req.body.hasOwnProperty("email") && req.body.hasOwnProperty("password")) {
            if([email,password ].some((field) => field == "")){
                return res.json(apiResponse(401,"all fields are required"))
              }
           }else{
            return res.json(apiResponse(401,"all fields are required"))
           }
           const userFound = await User.findOne({ email})
           console.log(userFound);
           
           if (!userFound) {
            return res.json(apiResponse(500,"email and password wrong"))
           }
           //const isPasswordCorrect = await userFound.checkPassword(password)
           const isPasswordCorrect = await userFound.checkPassword(password)
          console.log(isPasswordCorrect);
           
            if (!isPasswordCorrect) {
                return res.json(apiResponse(500,"email and password wrong"))
            }
            if(!userFound.emailVerified){
             return res.json(apiResponse(500,"email not verified, please check your mailbox"))
            }
            const user = await User.findById({_id:userFound._id}).select("-password")
            const { accessToken, refreshToken } = await generateTokens(userFound._id)
            return res.json(apiResponse(200, "login", {user, accessToken, refreshToken}))

    } catch (error) {
       console.log(error);
       
    }
   
}

const userUpdate = async (req,res) =>{ 
    try {
if(req.file){
    const {path } = req.file
    const user = await User.findById(req.user._id)
    if(user){
        const result = await cloudinaryUpload(path, user.displayname, "profilePic")
        user.profilePic = result.optimizeUrl
        user.public_id = result.uploadResult.public_id 
        await user.save()
        res.json(apiResponse(200, "avatar uploaded",{user}))
    }
}
    } catch (error) {
      console.log(error);
         
    }
    
}
const logout = async (req,res) => {
    try {
        const user = await User.findById(req.user.id)
        user.refreshToken = null
        await user.save()
        return res.json(apiResponse(200, "Logout successfully done"))
    } catch (error) {
        console.log(error)
    }
}
const getUser = async (req,res) => {
   try {
    const { id } = req.params
    const user = await User.findById({_id:id}).select("-password,-refreshToken")
    console.log(user);
    
    return res.json(apiResponse(200, "user details",user ))
   } catch (error) {
    console.log(error);
    
   }
}

export {createUser,emailVerify, login, logout, userUpdate,getUser}