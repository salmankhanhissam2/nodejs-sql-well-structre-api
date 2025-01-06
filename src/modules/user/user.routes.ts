import { Router } from "express";
import { signup, signin, userprofile } from "./user.controller";
import {
  validateSignupRequest,
  validateSiginpRequest,
} from "../../middlewares/validateRequest";
import { verifyToken } from "../../middlewares/authenticate";

const router = Router();

router.post("/signup", validateSignupRequest, signup);
router.post("/signin", validateSiginpRequest, signin);

router.get("/profile", verifyToken, validateSiginpRequest, userprofile);

export default router;
