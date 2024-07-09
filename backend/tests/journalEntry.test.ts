import request from "supertest";
import express from "express";
import bodyParser from "body-parser";
import JournalEntry from "../models/JournalEntry";
import { pool } from "../config/database";

// Mock dependencies
jest.mock("../config/database");

const app = express();
app.use(bodyParser.json());

// Mock middleware for user authentication if needed
const mockAuthMiddleware = (req: any, res: any, next: any) => {
  req.user = { userId: 1 };
  next();
};
app.use(mockAuthMiddleware);

// Mock pool.query method for PostgreSQL
const mockPoolQuery = jest.fn();
(pool.query as jest.Mock) = mockPoolQuery;

// Mock data for tests
const mockJournalEntry = {
  id: 1,
  title: "Test Journal Entry",
  content: "This is a test journal entry.",
  category_id: "1",
  date: new Date(),
  userId: 1,
};

describe("JournalEntry Model", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /journalEntries", () => {
    it("should create a new journal entry", async () => {
      // Mock pool.query to return a result
      mockPoolQuery.mockResolvedValueOnce({
        rows: [mockJournalEntry],
      });

      const response = await request(app).post("/journalEntries").send({
        title: "Test Journal Entry",
        content: "This is a test journal entry.",
        category_id: "1",
        date: new Date(),
        userId: 1,
      });

      expect(response.status).toBe(201);
      expect(response.body).toEqual(mockJournalEntry);
    });

    it("should return a 500 error if journal entry creation fails", async () => {
      // Mock pool.query to throw an error
      mockPoolQuery.mockRejectedValueOnce(new Error("Creation failed"));

      const response = await request(app).post("/journalEntries").send({
        title: "Test Journal Entry",
        content: "This is a test journal entry.",
        category_id: "1",
        date: new Date(),
        userId: 1,
      });

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty("message", "Creation failed");
    });
  });

  describe("GET /journalEntries/:id", () => {
    it("should get a journal entry by ID", async () => {
      // Mock pool.query to return a result
      mockPoolQuery.mockResolvedValueOnce({
        rows: [mockJournalEntry],
      });

      const response = await request(app).get("/journalEntries/1");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockJournalEntry);
    });

    it("should return a 404 error if journal entry is not found", async () => {
      // Mock pool.query to return an empty result
      mockPoolQuery.mockResolvedValueOnce({
        rows: [],
      });

      const response = await request(app).get("/journalEntries/1");

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty(
        "message",
        "Journal entry not found"
      );
    });
  });

  describe("PUT /journalEntries/:id", () => {
    it("should update a journal entry", async () => {
      // Mock pool.query to return a result
      mockPoolQuery.mockResolvedValueOnce({
        rows: [mockJournalEntry],
      });

      const response = await request(app).put("/journalEntries/1").send({
        title: "Updated Journal Entry",
        content: "This is an updated journal entry.",
        category_id: "2",
        date: new Date(),
      });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockJournalEntry);
    });

    it("should return a 404 error if journal entry is not found", async () => {
      // Mock pool.query to return an empty result
      mockPoolQuery.mockResolvedValueOnce({
        rows: [],
      });

      const response = await request(app).put("/journalEntries/1").send({
        title: "Updated Journal Entry",
        content: "This is an updated journal entry.",
        category_id: "2",
        date: new Date(),
      });

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty(
        "message",
        "Journal entry not found"
      );
    });
  });

  describe("DELETE /journalEntries/:id", () => {
    it("should delete a journal entry", async () => {
      const response = await request(app).delete("/journalEntries/1");

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty(
        "message",
        "Journal entry deleted successfully"
      );
    });

    it("should return a 500 error if deletion fails", async () => {
      // Mock pool.query to throw an error
      mockPoolQuery.mockRejectedValueOnce(new Error("Deletion failed"));

      const response = await request(app).delete("/journalEntries/1");

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty("message", "Deletion failed");
    });
  });

  describe("GET /journalEntries/user/:userId", () => {
    it("should get all journal entries for a user", async () => {
      // Mock pool.query to return a result
      mockPoolQuery.mockResolvedValueOnce({
        rows: [mockJournalEntry],
      });

      const response = await request(app).get("/journalEntries/user/1");

      expect(response.status).toBe(200);
      expect(response.body).toEqual([mockJournalEntry]);
    });

    it("should return a 500 error if fetching journal entries fails", async () => {
      // Mock pool.query to throw an error
      mockPoolQuery.mockRejectedValueOnce(new Error("Fetch failed"));

      const response = await request(app).get("/journalEntries/user/1");

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty("message", "Fetch failed");
    });
  });
});
