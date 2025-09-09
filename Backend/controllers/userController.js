import dotenv from "dotenv";
dotenv.config();
import UserModel from "../models/userModel.js";
import RefreshToken from "../models/refreshToken.js";
import { comparePassword, hashPassword, generateAccessToken, generateRefreshToken } from './../helpers/authHelper.js';
import JWT from 'jsonwebtoken';

// Register User
export const registerUserContoller = async (req, res) => {
    try{
        const { username , email , password} = req.body;
        
        // Blank Field Validation
        if(!username || !email || !password){
            return res.send({message : "All fields are required"})
        }
        
        // Check an Existing user
        const existing = await UserModel.findOne({email})
        if(existing){
            return res.status(200).send({
                success : false,
                message : "Already Registered please login",
            })
        }
        // Registering user
        const hashedPass = await hashPassword(password);

        const newUser = await new UserModel({
            username,
            email,
            password:hashedPass,
        }).save()
        res.status(200).send({
            success : true,
            message : "User Registered successfully",
            newUser
        })
    }
    catch(error){
        //console.log(error);
        res.status(500).send({
            success : false,
            message : "Error in registration",
            error
        })
    }    
}

// Login Controller
export const loginUserController = async(req,res) => {
    try{
        const {email , password} = req.body;
        // validation
        if(!email || !password){
            return res.status(404).send({
                success : false,
                message : "Invalid login credentials"
            })
        }
        const user = await UserModel.findOne({email})
        if(!user){
            return res.status(404).send({
                success : false,
                message : "Email is not registered"
            })
        }
        const match = await comparePassword(password , user.password)
        if(!match){
            return res.send({
                success : false,
                message : "Invalid password"
            })
        };
        
        // Token creation
        const accessToken = await generateAccessToken({ _id : user._id});
        const refreshToken = await generateRefreshToken({ _id : user._id});
        await RefreshToken.create({token : refreshToken, userId : user._id});
        res.status(200).send({
            success : true,
            message : "login successfully",
            user : {
                _id : user._id,
                username : user.username,
                email : user.email,
            },
            accessToken,
            refreshToken,
        })
    }
    catch(error){
        console.log("error", error);
        res.status(500).send({
            success : false,
            message : "Error in login",
            error
        })
    }
}

// refresh route
export const refreshTokenController = async(req, res) => {
    try {
        const { token } = req.body;
        if (!token) return res.sendStatus(401);

        // Check if refresh token exists in DB
        const storedToken = await RefreshToken.findOne({ token });
        if (!storedToken) return res.sendStatus(403);

        JWT.verify(token, process.env.REFRESH_SECRET, async (err, user) => {
            if (err) return res.sendStatus(403);
            const payload = { id: user._id};
            const accessToken = await generateAccessToken(payload);

            res.json({ 
                success : true,
                message : "token generated successfully",
                accessToken 
            });
        });
    } catch (error) {
        res.status(500).send({
            success : false,
            message : "Error in refresh token",
            error
        })
    }
}

// Logout Route
export const logoutController = async(req, res) => {
    try {
        const { token } = req.body;
        const deletedToken = await RefreshToken.findOneAndDelete({ token });
        res.json({ 
            success : true,
            message: "Logged out successfully", 
            deletedToken 
        });
    } catch (error) {
        res.status(500).send({
            success : false,
            message : "Error in logout",
            error
        })
    }
}
