const User = require('../models/User')
const jwt = require('jsonwebtoken')
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
    res.status(500).json({message:'registration failed try again later.'})
}

}

const loginUser=async(req,res)=>{
    try { const {email,password} = req.body
     const userEmail = await User.findOne({email:req.body.email})
     if(!userEmail){
       return res.status(400).json({message:'Incorrect Email or Password'})
     }

     const correctPw = await userEmail.isCorrectPassword(req.body.password);
 
      if (!correctPw) {
  return res.status(400).json({ message: "Incorrect email or password" });
}
const secret = process.env.JWT_SECRET
const expiration = '2h'
 

const user = userEmail

const payload = {
  _id: user._id,
  username: user.username,
};
 
const token = jwt.sign({ data: payload }, secret, { expiresIn: expiration })

res.json({ token, user:{_id: user._id,
    username: user.username,
    email: user.email
} })    


    } catch (error) {
        res.status(500).json({message:'failed to log in '})
    }
}

module.exports={registerUser,loginUser}