import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const hashPassword = async(password) => {
    try{
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password , saltRounds);
        return hashedPassword;
    }
    catch(error){
        console.log("Something went Wrong")
    }
}

export const comparePassword = async(password,hashedPassword) => {
    return bcrypt.compare(password , hashedPassword);
}

export const generateAccessToken = async(user) => {
  return jwt.sign(user, process.env.ACCESS_SECRET, { expiresIn: "15m" });
};

export const generateRefreshToken = async(user) => {
  return jwt.sign(user, process.env.REFRESH_SECRET, { expiresIn: "7d" });
};