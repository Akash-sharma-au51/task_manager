import Users from "../models/userModal";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { Request, Response } from 'express';


dotenv.config()


const registerUser = async (req: Request, res: Response) => {
    const { name, email, password, phone } = req.body;
  
    try {
      // Validate fields
      if (!name || !email || !password || !phone) {
        return res.status(400).json({
          message: "All fields are required",
          success: false
        });
      }
  
      // Check if user already exists
      const existingUser = await Users.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          message: "User already exists",
          success: false
        });
      }
  
      // Hash password
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Create new user
      const newUser = new Users({
        name,
        email,
        phone,
        password: hashedPassword
      });
      await newUser.save();
  
      // Create token
      if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in environment variables");
      }
  
      const token = jwt.sign(
        { id: newUser._id, email: newUser.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
  
      // Success response
      return res.status(201).json({
        message: "User created successfully",
        success: true,
        token
      });
  
    } catch (error) {
      console.error("Error in registerUser:", error);
      return res.status(500).json({
        message: "Server error",
        success: false,
        error
      });
    }
};


const loginUser = async(req:Request,res:Response)=>{
    const {email,password} = req.body
    try {
        if (!email||!password) {
            res.status(400).json({
                message:"all feilds are required",
                success:false
            })
            
        }

        let user = await Users.findOne({email})
        if (!user) {
            res.status(400).json({
                message:"user dose not exist",
                success:false
            })
            
        }

        if (!user?.password) {
            return res.status(400).json({
                message: "User password not found",
                success: false
            });
        }

        const ispasswordmatch = await bcrypt.compare(password, user.password);
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET as string,
            { expiresIn: '1h' }
        );

        if (!ispasswordmatch) {
            return res.status(400).json({
                message: "Invalid credentials",
                token,
                success: false
            });
        }

        //login successfull

        res.status(200).json({
            message:`Welcome back ${user.name}`,
            success:true
        })}
        catch{
            res.status(500).json({
                message:"internal server error",
                success:false
            })
        }
}

const logoutUser = async(req:Request,res:Response) =>{
    try {
        res.clearCookie('token').status(200).json({
            message:"user loggedoff successfully",
            success:true
        })
        
    } catch (error) {
        res.status(500).json({
            message:"internal server error",
            success:false
        })
        
    }
    

}

export default {registerUser,loginUser,logoutUser}














