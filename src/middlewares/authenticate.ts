import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../modules/user/user.model";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

interface DecodedToken {
  userId: number;
  email: string;
}

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    res.status(401).json({ error: "Access denied, no token provided." });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;
    console.log("Decoded Token:", decoded);

    const user = await User.findOne({ where: { id: decoded.userId } });

    console.log("User Query Result:", user);
    if (!user) {
      res.status(404).json({ error: "User not found or deleted." });
      return;
    }

    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res
        .status(401)
        .json({ error: "Token has expired. Please log in again." });
      return;
    }
    res.status(400).json({ error: "Invalid token." });
    return;
  }
};
