import { Router } from "express";
import {
  register,
  login,
  token,
  getDetails,
} from "../controllers/authController";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/token", token);
router.get("/me", authenticateToken, getDetails);

export default router;
