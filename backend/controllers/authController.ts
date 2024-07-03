import { Request, Response } from "express";
import jwt, { VerifyErrors } from "jsonwebtoken";
import User from "../models/user";
import { generateAccessToken, generateRefreshAccessToken } from "../utils/jwt";

const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;
let refreshTokens: string[] = [];

export const register = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await User.create(username, password);
    res.status(201).send("User Registered!");
  } catch (error) {
    console.error("Error registering new user: ", error);
    res.status(500).send("Failed to register user");
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await User.findByUsername(username);

    // if user not found or password doesnt match
    if (!user || !user.verifyPassword(password)) {
      return res.status(401).send("Invalid Credentials");
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshAccessToken(user);
    refreshTokens.push(refreshToken);
    res.json({ accessToken, refreshToken });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).send("Login Failed!");
  }
};

// interface for handling the error faced in the callback parameter of user
interface UserType {
  userId: string;
  username: string;
}

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
  } catch (error) {
    console.error("Error refreshing token:", error);
    res.status(500).send("Token refresh failed");
  }
};
