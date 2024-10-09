 import { User } from "../models/userSchema.model.js"

 import { mail } from "../utils/sendMail.js"
import { verificationTemplate } from "../mailTemp/verificationTemplate.js"
import { cloudinaryUpload } from "../services/cloudinary.js"

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
            const { accessToken, refreshToken } = await generateTokens(userFound.
                _id
            )
            return res.json({ accessToken, refreshToken})
    } catch (error) {
       console.log(error);
       
    }
   
}

const userUpdate = async (req,res) =>{
if(req.file){
    const {path } = req.file
    const result = await cloudinaryUpload(path, "a user", "profilePic")
     
  res.json("okk")
}
    
}

export {createUser,emailVerify, login, userUpdate}