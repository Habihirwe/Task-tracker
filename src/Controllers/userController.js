import User from "../Models/userModel.js";
import userValidationSchema from "../validation/userValidation.js";
import bcrypt from 'bcrypt'
import  Jwt  from "jsonwebtoken";


const createUser= async(req,res)=>{
    const {error} = userValidationSchema.validate(req.body)
    if (error)
        return res.status(400).json({"validationError": error.details[0].message})

    const duplicatedEmail = await User.findOne({email: req.body.email})

    if (duplicatedEmail)
        return res.status(409).json({"message": `A user with email ${req.body.email} already exist!`})

    try{
        const salt = await bcrypt.genSalt(10)
        const hashedpassword=await bcrypt.hash(req.body.password,salt)
        const hashedrepeatpassword= await bcrypt.hash(req.body.repeatPassword,salt)


        const user= new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email:req.body.email,
            password: hashedpassword,
            repeatPassword: hashedrepeatpassword

        })
        await user.save();
        res.status(201).json({
            status: "success", 
            "successMessage":"account created successfully",
            user: user});
            console.log("User registered successfully!");

    }catch(err){
        res.status(500).json(
            { status:"fail",
             error: err
            });

            

    }

}

const Login =async(req,res)=>{
    try{
    const user= await User.findOne({email:req.body.email})
    if(!user){

        return res.status(400).json({
            status:"fail",
            "InvalidCredentials":"Invalid email or password"
        })
    }
    const isPasswordValid= await bcrypt.compare(req.body.password, user.password)
    if(!isPasswordValid){
        return res.status(400).json({
            status:"failed",
            "InvalidCredentials":"Invalid email or password"
        });

    }
const token = Jwt.sign({id:user._id},process.env.JWT_SECRET, {
    expiresIn: "48h",
} )
res.header("auth_token", token)
return res.status(201).json({
    status:"success",
    "successMessage":"LoggedIn successfully!", "token": token
})
    }catch(err){
        return res.status(500).json(err.message);
        
    }  
} 
const getsingleUser= async(req,res)=>{
    try{
        const singleUser= await User.findById(req.params.id)
        if(!singleUser){
            return res.status(404).json({
                status:"fail",
                message:"user not found!!!"
            })
        }
        return res.status(200).json({
            status:'sucessss',
            data:singleUser
        })

    }catch(err){
       return  res.status(500).json({
            error:err,
        })

    }
}

const getAllUsers= async (req,res)=>{
    try{
        const users= await User.find();
        return res.status(200).json({
            status:"success",
            "allusers":users
        })
    }catch(err){
        return res.status(500).json({
            status:"fail",
            error:err.message
        })
    }
}
export { createUser, Login ,getsingleUser,getAllUsers }