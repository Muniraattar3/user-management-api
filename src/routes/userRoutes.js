import express from "express";
import {
    registerUser,
  getAllUsers,
  deleteUser,
  updateUserRole,
  loginUser
} from "../controllers/userController.js";

//import { protect, restrictTo } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// Admin-only routes
router.get("/", getAllUsers);
//router.get("/:id", errorUser);
router.delete("/:id", deleteUser);
router.patch("/:id/role", updateUserRole);

export default router;
