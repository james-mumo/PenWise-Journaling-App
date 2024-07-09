// /tests/auth.test.ts

import request from "supertest";
import express from "express";
import bodyParser from "body-parser";
import {
  register,
  login,
  token,
  getDetails,
  updateDetails,
} from "../controllers/authController";
import User from "../models/User";
import { generateAccessToken, generateRefreshAccessToken } from "../utils/jwt";
import jwt from "jsonwebtoken";

// Mock dependencies
jest.mock("../models/User");
jest.mock("../utils/jwt");
jest.mock("jsonwebtoken");

const app = express();
app.use(bodyParser.json());
app.post("/register", register);
app.post("/login", login);
app.post("/token", token);
app.get("/details", getDetails);
app.put("/details", updateDetails);

// Mock middleware for user authentication
const mockAuthMiddleware = (req: any, res: any, next: any) => {
  req.user = { userId: 1 };
  next();
};
app.use("/details", mockAuthMiddleware);

describe("POST /login", () => {
  it("should login a user and return tokens", async () => {
    // Mock User.findByEmail
    (User.findByEmail as jest.Mock).mockResolvedValue({
      id: 1,
      email: "test@example.com",
      verifyPassword: jest.fn().mockResolvedValue(true),
    });

    // Mock token generation
    (generateAccessToken as jest.Mock).mockReturnValue("accessToken");
    (generateRefreshAccessToken as jest.Mock).mockReturnValue("refreshToken");

    const response = await request(app).post("/login").send({
      email: "test@example.com",
      password: "password123",
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("accessToken", "accessToken");
    expect(response.body).toHaveProperty("refreshToken", "refreshToken");
  });

  it("should return a 401 error if credentials are invalid", async () => {
    // Mock User.findByEmail
    (User.findByEmail as jest.Mock).mockResolvedValue(null);

    const response = await request(app).post("/login").send({
      email: "test@example.com",
      password: "wrongpassword",
    });

    expect(response.status).toBe(401);
    expect(response.text).toBe("Invalid Credentials");
  });
});

describe("POST /token", () => {
  it("should generate a new access token", async () => {
    const refreshToken = "validRefreshToken";
    const decodedUser = { userId: 1, email: "test@example.com" };

    // Mock jwt.verify
    (jwt.verify as jest.Mock).mockImplementation((token, secret, callback) => {
      callback(null, decodedUser);
    });

    // Mock token generation
    (generateAccessToken as jest.Mock).mockReturnValue("newAccessToken");

    const response = await request(app)
      .post("/token")
      .send({ token: refreshToken });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("accessToken", "newAccessToken");
  });

  it("should return a 403 error if token is invalid", async () => {
    const invalidToken = "invalidToken";

    // Mock jwt.verify to throw an error
    (jwt.verify as jest.Mock).mockImplementation((token, secret, callback) => {
      callback(new Error("Invalid token"), null);
    });

    const response = await request(app)
      .post("/token")
      .send({ token: invalidToken });

    expect(response.status).toBe(403);
  });
});

describe("GET /details", () => {
  it("should fetch user details", async () => {
    // Mock User.findById
    (User.findById as jest.Mock).mockResolvedValue({
      id: 1,
      email: "test@example.com",
      username: "testuser",
    });

    const response = await request(app).get("/details");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: 1,
      email: "test@example.com",
      username: "testuser",
    });
  });

  it("should return a 404 error if user is not found", async () => {
    // Mock User.findById
    (User.findById as jest.Mock).mockResolvedValue(null);

    const response = await request(app).get("/details");

    expect(response.status).toBe(404);
    expect(response.text).toBe("User not found");
  });
});

describe("PUT /details", () => {
  it("should update user details", async () => {
    // Mock User.findById
    (User.findById as jest.Mock).mockResolvedValue({
      id: 1,
      email: "old@example.com",
      username: "olduser",
      verifyPassword: jest.fn().mockResolvedValue(true),
      updateDetails: jest.fn().mockResolvedValue(true),
    });

    // Mock token generation
    (generateAccessToken as jest.Mock).mockReturnValue("newAccessToken");
    (generateRefreshAccessToken as jest.Mock).mockReturnValue(
      "newRefreshToken"
    );

    const response = await request(app).put("/details").send({
      currentPassword: "password123",
      newPassword: "newpassword123",
      email: "new@example.com",
      username: "newuser",
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("accessToken", "newAccessToken");
    expect(response.body).toHaveProperty("refreshToken", "newRefreshToken");
  });

  it("should return a 401 error if current password is incorrect", async () => {
    // Mock User.findById
    (User.findById as jest.Mock).mockResolvedValue({
      id: 1,
      email: "old@example.com",
      username: "olduser",
      verifyPassword: jest.fn().mockResolvedValue(false),
    });

    const response = await request(app).put("/details").send({
      currentPassword: "wrongpassword",
      newPassword: "newpassword123",
      email: "new@example.com",
      username: "newuser",
    });

    expect(response.status).toBe(401);
    expect(response.text).toBe("Current password is incorrect");
  });
});
