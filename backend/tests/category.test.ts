import request from "supertest";
import express from "express";
import bodyParser from "body-parser";
import {
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
  getAllCategoriesByUserId,
  getAllCategoriesByUserIdCount,
} from "../controllers/categoryController";
import Category from "../models/Category";

// Mock dependencies
jest.mock("../models/Category");

const app = express();
app.use(bodyParser.json());
app.post("/categories", createCategory);
app.get("/categories/:id", getCategoryById);
app.put("/categories/:id", updateCategory);
app.delete("/categories/:id", deleteCategory);
app.get("/categories/user/:userId", getAllCategoriesByUserId);
app.get("/categories/user/:userId/count", getAllCategoriesByUserIdCount);

// Mock middleware for user authentication
const mockAuthMiddleware = (req: any, res: any, next: any) => {
  req.user = { userId: 1 };
  next();
};
app.use("/categories", mockAuthMiddleware);

describe("POST /categories", () => {
  it("should create a new category", async () => {
    // Mock Category.create
    (Category.create as jest.Mock).mockResolvedValue({
      id: 1,
      name: "Work",
      color: "blue",
      userId: 1,
      isEditable: true,
    });

    const response = await request(app).post("/categories").send({
      name: "Work",
      color: "blue",
      isEditable: true,
    });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      id: 1,
      name: "Work",
      color: "blue",
      userId: 1,
      isEditable: true,
    });
  });

  it("should return a 500 error if category creation fails", async () => {
    // Mock Category.create to throw an error
    (Category.create as jest.Mock).mockRejectedValue(
      new Error("Creation failed")
    );

    const response = await request(app).post("/categories").send({
      name: "Work",
      color: "blue",
      isEditable: true,
    });

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty("message", "Creation failed");
  });
});

describe("GET /categories/:id", () => {
  it("should get a category by ID", async () => {
    // Mock Category.findById
    (Category.findById as jest.Mock).mockResolvedValue({
      id: 1,
      name: "Work",
      color: "blue",
      userId: 1,
      isEditable: true,
    });

    const response = await request(app).get("/categories/1");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: 1,
      name: "Work",
      color: "blue",
      userId: 1,
      isEditable: true,
    });
  });

  it("should return a 404 error if category is not found", async () => {
    // Mock Category.findById
    (Category.findById as jest.Mock).mockResolvedValue(null);

    const response = await request(app).get("/categories/1");

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "Category not found");
  });
});

describe("PUT /categories/:id", () => {
  it("should update a category", async () => {
    // Mock Category.update
    (Category.update as jest.Mock).mockResolvedValue({
      id: 1,
      name: "Work Updated",
      color: "red",
      userId: 1,
      isEditable: true,
    });

    const response = await request(app).put("/categories/1").send({
      name: "Work Updated",
      color: "red",
      isEditable: true,
    });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: 1,
      name: "Work Updated",
      color: "red",
      userId: 1,
      isEditable: true,
    });
  });

  it("should return a 404 error if category is not found", async () => {
    // Mock Category.update
    (Category.update as jest.Mock).mockResolvedValue(null);

    const response = await request(app).put("/categories/1").send({
      name: "Work Updated",
      color: "red",
      isEditable: true,
    });

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "Category not found");
  });

  it("should return a 400 error if invalid data is provided", async () => {
    const response = await request(app).put("/categories/1").send({
      name: "",
      color: "red",
      isEditable: true,
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      "message",
      "Invalid data provided for update"
    );
  });
});

describe("DELETE /categories/:id", () => {
  it("should delete a category", async () => {
    const response = await request(app).delete("/categories/1");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      "message",
      "Category deleted successfully"
    );
  });

  it("should return a 500 error if deletion fails", async () => {
    // Mock Category.delete to throw an error
    (Category.delete as jest.Mock).mockRejectedValue(
      new Error("Deletion failed")
    );

    const response = await request(app).delete("/categories/1");

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty("message", "Deletion failed");
  });
});

describe("GET /categories/user/:userId", () => {
  it("should get all categories for a user", async () => {
    // Mock Category.findAllByUserId
    (Category.findAllByUserId as jest.Mock).mockResolvedValue([
      {
        id: 1,
        name: "Work",
        color: "blue",
        userId: 1,
        isEditable: true,
      },
    ]);

    const response = await request(app).get("/categories/user/1");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        id: 1,
        name: "Work",
        color: "blue",
        userId: 1,
        isEditable: true,
      },
    ]);
  });

  it("should return a 500 error if fetching categories fails", async () => {
    // Mock Category.findAllByUserId to throw an error
    (Category.findAllByUserId as jest.Mock).mockRejectedValue(
      new Error("Fetch failed")
    );

    const response = await request(app).get("/categories/user/1");

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty("message", "Fetch failed");
  });
});

describe("GET /categories/user/:userId/count", () => {
  it("should get all categories with entry count for a user", async () => {
    // Mock Category.getCategoriesWithEntryCount
    (Category.getCategoriesWithEntryCount as jest.Mock).mockResolvedValue([
      {
        id: 1,
        name: "Work",
        color: "blue",
        userId: 1,
        isEditable: true,
        entryCount: 5,
      },
    ]);

    const response = await request(app).get("/categories/user/1/count");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        id: 1,
        name: "Work",
        color: "blue",
        userId: 1,
        isEditable: true,
        entryCount: 5,
      },
    ]);
  });

  it("should return a 500 error if fetching categories with entry count fails", async () => {
    // Mock Category.getCategoriesWithEntryCount to throw an error
    (Category.getCategoriesWithEntryCount as jest.Mock).mockRejectedValue(
      new Error("Fetch failed")
    );

    const response = await request(app).get("/categories/user/1/count");

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty("message", "Fetch failed");
  });
});
