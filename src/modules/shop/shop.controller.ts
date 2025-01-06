import { Request, Response } from "express";
import { Optional } from "sequelize";
import Shop from "./shop.model"; // Import your Shop model
import { IShop } from "../interfaces/shop.interface";
import User from "../user/user.model";

// Controller to create a shop
export const createShop = async (req: Request, res: Response) => {
  try {
    const { shop_name, location, status } = req.body;

    // \\Extract the user_id from the decoded token (available via req.user)
    const userId = req.user?.userId; // userId is set in the verifyToken middleware

    if (!userId) {
      res.status(400).json({ error: "User ID is missing." });
      return;
    }

    // Create the shop record, including the user_id
    const shop = await Shop.create({
      shop_name,
      location,
      status,
      userId, // Add the user_id to the shop data
    } as Optional<IShop, "id" | "createdAt" | "updatedAt">);

    // Return the response with the created shop
    res.status(201).json({ message: "Shop created successfully", shop });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
  }
};

export const shopView = async (req: Request, res: Response) => {
  try {
    console.log("here is try for shopVIew");
    const { id } = req.params;

    console.log("params", id);

    const shopWithUser = await Shop.findOne({
      where: { id },
      include: [
        {
          model: User,
          as: "user",
        },
      ],
    });

    res.status(200).json({ shopWithUser });
  } catch (error) {}
};
