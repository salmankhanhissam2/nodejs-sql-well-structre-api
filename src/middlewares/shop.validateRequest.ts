import { Request, Response, NextFunction } from "express";

export const validateShopCreateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { shop_name, location } = req.body;

  // Check if shop_name and location are provided
  if (!shop_name || typeof shop_name !== "string") {
    res
      .status(400)
      .json({ error: "Invalid or missing 'shop_name'. It must be a string." });
    return;
  }

  if (!location || typeof location !== "string") {
    res
      .status(400)
      .json({ error: "Invalid or missing 'location'. It must be a string." });
    return;
  }

  // Additional validations (optional)
  if (shop_name.length < 3 || shop_name.length > 255) {
    res.status(400).json({
      error: "'shop_name' must be between 3 and 255 characters.",
    });
    return;
  }

  if (location.length < 3 || location.length > 255) {
    res.status(400).json({
      error: "'location' must be between 3 and 255 characters.",
    });
    return;
  }

  // If all validations pass, proceed to the next middleware or controller
  next();
};

// view shops of other users
export const validateShopViewRequest = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ error: "send  userId from body", id });
  } else {
    next(); // Pass control to the next middleware or route handler
  }
};
