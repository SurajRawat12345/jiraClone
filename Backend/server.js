import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

// Connect to DB
const url = process.env.MONGO_URL;
mongoose.connect(url)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB error:", err));

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true}))
app.use(morgan('dev'));

// Test Route
app.get('/', (req, res) => {
    res.status(200).json({
        "success": true,
        "msg": "Hello World",
    })
})

app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})