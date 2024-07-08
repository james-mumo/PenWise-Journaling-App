import { Router } from "express";
import {
  register,
  login,
  token,
  getDetails,
  updateDetails,
} from "../controllers/authController";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = Router();

// user authentication and authorization routes
router.post("/register", register);
router.post("/login", login);
router.post("/token", token);
router.get("/me", authenticateToken, getDetails);
router.put("/update", authenticateToken, updateDetails);

export default router;
