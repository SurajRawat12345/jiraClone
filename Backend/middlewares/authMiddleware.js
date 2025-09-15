import jwt from "jsonwebtoken";
import UserModel from "../models/userModel.js";

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
};

export const isAdmin = async(req, res, next) => {
    console.log(req.user);
    const user = await UserModel.findById(req.user._id);
    console.log(user);
    if (user.role !== "admin") return res.sendStatus(403);
    next();
};