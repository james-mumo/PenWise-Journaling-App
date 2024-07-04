import { Request, Response } from "express";
import JournalEntry from "../models/JournalEntry";

// creating a journal entry
export const createJournalEntry = async (req: Request, res: Response) => {
  const { title, content, category, date } = req.body;
  const userId = req.user.userId;

  try {
    const newJournalEntry = await JournalEntry.create(
      title,
      content,
      category,
      new Date(date),
      userId
    );
    res.status(201).json(newJournalEntry);
  } catch (error) {
    res.status(500).json({ error: "Failed to create journal entry" });
    console.log(error);
  }
};

// get a journal entry based on id
export const getJournalEntry = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const journalEntry = await JournalEntry.findById(Number(id));

    if (!journalEntry || journalEntry.userId !== req.user.userId) {
      return res
        .status(404)
        .json({ error: "Journal entry not found or you do not have access" });
    }

    res.status(200).json(journalEntry);
  } catch (error) {
    console.error("Failed to fetch journal entry:", error);
    res.status(500).json({ error: "Failed to fetch journal entry" });
  }
};

// get all journal entries for the current user
export const getAllJournalEntries = async (req: Request, res: Response) => {
  const userId = req.user.userId;

  try {
    const journalEntries = await JournalEntry.findAllByUserId(userId);
    res.status(200).json(journalEntries);
  } catch (error) {
    console.error("Error fetching journal entries:", error);
    res.status(500).json({ error: "Failed to fetch journal entries" });
  }
};

// updating a specific journal entry based on id
export const updateJournalEntry = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, content, category, date } = req.body;

  try {
    const journalEntry = await JournalEntry.findById(Number(id));

    if (journalEntry && journalEntry.userId === req.user.userId) {
      const updatedJournalEntry = await JournalEntry.update(
        Number(id),
        title,
        content,
        category,
        new Date(date)
      );
      res.status(200).json(updatedJournalEntry);
    } else {
      res
        .status(404)
        .json({ error: "Journal entry not found or you do not have access" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update journal entry" });
  }
};

// deleting a journal entry
export const deleteJournalEntry = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const journalEntry = await JournalEntry.findById(Number(id));

    if (!journalEntry || journalEntry.userId !== req.user.userId) {
      return res
        .status(404)
        .json({ error: "Journal entry not found or you do not have access" });
    }

    await JournalEntry.delete(Number(id));
    res.status(204).json({ message: "Journal entry deleted successfully" });
  } catch (error) {
    console.error("Failed to delete journal entry:", error);
    res.status(500).json({ error: "Failed to delete journal entry" });
  }
};
