import jwt from "jsonwebtoken";
import User from "../models/User";

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET!;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;

// access token generation method
export const generateAccessToken = (user: User) => {
  return jwt.sign(
    { userId: user.id, username: user.username },
    JWT_ACCESS_SECRET,
    { expiresIn: "20m" }
  );
};

// refresh token generation method
export const generateRefreshAccessToken = (user: User) => {
  return jwt.sign(
    { userId: user.id, username: user.username },
    JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  );
};
