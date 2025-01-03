import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../modules/user/user.model";

// JWT secret key
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// Define the type for the decoded JWT token
interface DecodedToken {
  userId: number;
  email: string;
}

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Get token from Authorization header
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    res.status(401).json({ error: "Access denied, no token provided." });
    return;
  }

  try {
    // Verify the token using the secret key and decode it
    const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;
    const user = await User.findOne({ where: { id: decoded.userId } });

    if (!user) {
      res.status(404).json({ error: "User not found or deleted." });
      return;
    }

    // Attach the user info to the request object for use in the next middleware or route handler
    req.user = decoded; // Now `req.user` will have the correct type
    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid or expired token." });
  }
};
