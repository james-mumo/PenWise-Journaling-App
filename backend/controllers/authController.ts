import { Request, Response } from "express";
import jwt, { VerifyErrors } from "jsonwebtoken";
import User from "../models/User";
import { generateAccessToken, generateRefreshAccessToken } from "../utils/jwt";

const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;
let refreshTokens: string[] = [];

// method to handle user registration
export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.create(username, email, password);

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshAccessToken(user);
    refreshTokens.push(refreshToken);

    res.status(201).json({ accessToken, refreshToken, user });
  } catch (error: any) {
    console.error("Error registering new user: ", error);
    res.status(500).send("Failed to register user");
  }
};

// method to handle user login
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByEmail(email);

    if (!user || !(await user.verifyPassword(password))) {
      return res.status(401).send("Invalid Credentials");
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshAccessToken(user);

    refreshTokens.push(refreshToken);
    res.json({ accessToken, refreshToken });
  } catch (error: any) {
    console.error("Error logging in user:", error);
    res.status(500).send("Login Failed!");
  }
};

// method to handle token generation and refreshing
export const token = async (req: Request, res: Response) => {
  try {
    const { token } = req.body;

    if (!token || !refreshTokens.includes(token)) {
      return res.sendStatus(403);
    }

    jwt.verify(
      token,
      JWT_REFRESH_SECRET,
      (err: VerifyErrors | null, user: any | undefined) => {
        if (err) return res.sendStatus(403);

        const accessToken = generateAccessToken(user);
        res.json({ accessToken });
      }
    );
  } catch (error: any) {
    console.error("Error refreshing token:", error);
    res.status(500).send("Token refresh failed");
  }
};

// method to fetch user details
export const getDetails = async (req: Request, res: Response) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).send("Failed to fetch user details");
  }
};

// method to update user detaills
export const updateDetails = async (req: Request, res: Response) => {
  try {
    const { currentPassword, newPassword, email, username } = req.body;
    const userId = req.user.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send("User not found");
    }

    const passwordValid = await user.verifyPassword(currentPassword);
    if (!passwordValid) {
      return res.status(401).send("Current password is incorrect");
    }

    await user.updateDetails(email, username, newPassword);

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshAccessToken(user);

    res.json({ accessToken, refreshToken });
  } catch (error: any) {
    console.error("Error updating user details:", error);
    res.status(500).send("Failed to update user details");
  }
};
