import express from "express";
const router = express.Router();
import { registerUserContoller, loginUserController, refreshTokenController, logoutController } from "../controllers/userController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

router.post("/register", registerUserContoller);
router.post("/login", loginUserController);
router.post("/refresh", refreshTokenController);
router.post("/logout", logoutController);
// Protected route
router.get("/dashboard", authenticateToken, (req, res) => {
    console.log(req.user);
    res.json({ message: `Welcome ${req.user.username}` });
});

export default router;