 import { User } from "../models/userSchema.model.js"

 import { mail } from "../utils/sendMail.js"
import { verificationTemplate } from "../mailTemp/verificationTemplate.js"
import { cloudinaryUpload } from "../services/cloudinary.js"
import ApiResponse from "../utils/ApiResponse.js"
import response from "../utils/ApiResponse.js"

const generateTokens = async (id) => {
    try {
   const user = await User.findById({ _id:id })
    const accessToken =await user.generateAccessToken()
    const refreshToken = await user.generaterefreshToken()
    user.refreshToken = refreshToken
    await user.save()
    return { accessToken, refreshToken}
    } catch (error) {
console.log(error);

    }
}
 const createUser = async (req,res)=>{
    try {
        const {displayname,email,password,phonenumber} = req.body
 const isFound = await  User.findOne({email})
if (isFound) {
 return  res.json("email done")
}
const user = await User.create({displayname,password,email,phonenumber})
const link = await user.generateAccessToken()
await mail(user.email,"verification","hello",verificationTemplate(link))
 return res.json("ok")
 
} 
 catch (error) {
       console.log(error);
        
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
        if (req.body.hasOwnProperty("email") && req.body.hasOwnProperty("password")) {
            if([email,password ].some((field) => field == "")){
                return res.json("all fields are required")
              }
           }else{
        
        return res.json("invalid")
           } 
           const userFound = await User.findOne({ email})
           if (!userFound) {
            return res.send("email and password wrong")
           }
           const isPasswordCorrect = await userFound.checkPassword(password)
            if (!isPasswordCorrect) {
                return res.send("email and password wrong")
            }
            if(!userFound.emailVerified){
             return res.send("email not verified, please check your mailbox")
            }
            const { accessToken, refreshToken } = await generateTokens(userFound.
                _id
            )
            return res.json(apiLoginResponse(200, "login", { accessToken, refreshToken}))
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
        const user = await user.findById(req.user.id)
        user.refreshToken = null
        await user.save()
    } catch (error) {
        console.log(error)
    }
}

export {createUser,emailVerify, login, logout, userUpdate}