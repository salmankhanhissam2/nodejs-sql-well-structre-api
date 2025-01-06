// src/modules/shop/shop.routes.ts
import { Router } from "express";
import { createShop, shopView } from "./shop.controller"; // Import createShop controller
import { verifyToken } from "../../middlewares/authenticate"; // Import token verification middleware
import {
  validateShopCreateRequest,
  validateShopViewRequest,
} from "../../middlewares/shop.validateRequest"; // Import validation middleware

const shopRouter = Router();

// POST route for creating a shop
shopRouter.post("/create", verifyToken, validateShopCreateRequest, createShop);
shopRouter.get("/shopview/:id", verifyToken, validateShopViewRequest, shopView);

export default shopRouter;
