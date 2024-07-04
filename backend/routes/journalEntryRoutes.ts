import express from "express";
import {
  createJournalEntry,
  getJournalEntry,
  updateJournalEntry,
  deleteJournalEntry,
  getAllJournalEntries,
} from "../controllers/journalEntryController";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/", authenticateToken, createJournalEntry);
router.get("/", authenticateToken, getAllJournalEntries);
router.get("/:id", authenticateToken, getJournalEntry);
router.put("/:id", authenticateToken, updateJournalEntry);
router.delete("/:id", authenticateToken, deleteJournalEntry);

export default router;
