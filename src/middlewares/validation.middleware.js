export const validation = async (req,res,next) =>{
    const {displayname,email,password } = req.body
   if (req.body.hasOwnProperty("displayname") && req.body.hasOwnProperty("email") && req.body.hasOwnProperty("password") && req.body.hasOwnProperty("role") ) {
    if([displayname,email,password ].some((field) => field === "")){
        return res.json("all fields are required")
      }
   }else{

return res.json("invalid")
   }
    next()
}