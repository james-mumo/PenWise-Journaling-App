import { Router } from "express";
import { register, login, token } from "../controllers/authController";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/token", token);

export default router;
