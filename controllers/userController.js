const User = require('../models/User')

const registerUser=async(req,res)=>{
try{
    const {username,email,password}=req.body
    const checkEmail = await User.findOne({email}) 

    if(checkEmail){
    return    res.status(400).json({message:'this email is already registered'})
    }
    const newUser = new User ({username,email,password})
    const saveUser = await newUser.save()
   
    res.status(201).json({username: saveUser.username,email: saveUser.email})
  
} 

catch(error){
    res.status(500).json({message:'regstration failed try again later.'})
}

}

module.exports=registerUser