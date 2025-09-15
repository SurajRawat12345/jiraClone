import express from "express";
import { createProjectController, getProjectsController } from "../controllers/projectController.js";
import { authenticateToken, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Protected route for creating project
router.post("/create", authenticateToken, isAdmin, createProjectController);

// Protected route for getting all projects
router.get("/get-all", authenticateToken, getProjectsController);

export default router;