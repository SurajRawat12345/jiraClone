import express from "express";
import { createProjectController } from "../controllers/projectController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create",authenticateToken, createProjectController);

export default router;