import { Request, Response } from "express";
import User from "./user.model";
import bcrypt from "bcrypt";
import { Optional } from "sequelize"; // Import Optional
import { IUser, ILoginCredentials } from "../interfaces/user.interface";
import jwt from "jsonwebtoken"; // Import jwt
import Shop from "../shop/shop.model";
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
export const signup = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    const usrfindond = await User.findOne({ where: { email } });

    if (usrfindond) {
      res.status(403).json({ message: "User All ready exist", email });
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the users
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    } as Optional<IUser, "id" | "createdAt" | "updatedAt">); // Cast to Optional

    res.status(201).json({ message: "User created successfully", user });
  } catch (error: any) {
    console.log(error);

    if (error.name === "SequelizeUniqueConstraintError") {
      res.status(400).json({ error: "Email already exists." });
    } else {
      res.status(500).json({ error: "Internal server error." });
    }
  }
};

export const signin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as ILoginCredentials;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      res.status(401).json({ error: "Invalid email or password." });
      return;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      res.status(401).json({ error: "Invalid email or password." });
      return;
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email }, // Payload
      JWT_SECRET, // Secret key
      { expiresIn: "1h" } // Expiration time
    );

    // Send the token in response
    res.status(200).json({ message: "Login successful!", token });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error: "Internal server error." });
  }
};
export const userprofile = async (req: Request, res: Response) => {
  console.log("userprofile");

  try {
    console.log("userprofile try");
    const userId = req.user?.userId;
    console.log("userprofile userId", userId);

    if (!userId) {
      res.status(400).json({ error: "User ID is missing." });
      return;
    }

    const shops = await Shop.findAll({ where: { userId } });

    res.status(200).json({ shops });

    console.log("shops ", shops);
  } catch (error) {
    console.log("userprofile cathc", error);
  }
};
