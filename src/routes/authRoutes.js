/*import express from "express";
import { registerUser, loginUser, getMe } from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public routes
router.post("/register", registerUser)
router.post("/login", loginUser);

// Protected route: only logged-in users
router.get("/me", protect, getMe);

export default router;

*/