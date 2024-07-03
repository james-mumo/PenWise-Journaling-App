import jwt from "jsonwebtoken";
import User from "../models/User";

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET!;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;

export const generateAccessToken = (user: User) => {
  return jwt.sign(
    { userId: user.id, username: user.username },
    JWT_ACCESS_SECRET,
    { expiresIn: "2m" }
  );
};

export const generateRefreshAccessToken = (user: User) => {
  return jwt.sign(
    { userId: user.id, username: user.username },
    JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  );
};
