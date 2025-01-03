import { Router } from "express";
import { signup, signin } from "./user.controller";
import {
  validateSignupRequest,
  validateSiginpRequest,
} from "../../middlewares/validateRequest";
import { verifyToken } from "../../middlewares/authenticate";

const router = Router();

router.post("/signup", validateSignupRequest, signup);
router.post("/signin", validateSiginpRequest, signin);

router.get("/profile", verifyToken, (req, res) => {
  // Accessing the user from the `req.user` property
  if (req.user) {
    res.status(200).json({ message: "Profile data", user: req.user });
  } else {
    res.status(400).json({ error: "User not found." });
  }
});

export default router;
