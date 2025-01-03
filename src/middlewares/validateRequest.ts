import { Request, Response, NextFunction } from "express";

export const validateSignupRequest = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400).json({ error: "All fields are required." });
  } else {
    next(); // Pass control to the next middleware or route handler
  }
};
export const validateSiginpRequest = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "All fields are required." });
  } else {
    next(); // Pass control to the next middleware or route handler
  }
};
