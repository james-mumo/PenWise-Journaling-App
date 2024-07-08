import express from "express";
import {
  createCategory,
  updateCategory,
  deleteCategory,
  getAllCategoriesByUserId,
  getCategoryById,
  getAllCategoriesByUserIdCount,
} from "../controllers/categoryController";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = express.Router();

// jounal category routes
router.post("/", authenticateToken, createCategory);
router.get("/", authenticateToken, getAllCategoriesByUserId);
router.get("/:id", authenticateToken, getCategoryById);
router.put("/:id", authenticateToken, updateCategory);
router.delete("/:id", authenticateToken, deleteCategory);
router.get("/count/each", authenticateToken, getAllCategoriesByUserIdCount);

export default router;
