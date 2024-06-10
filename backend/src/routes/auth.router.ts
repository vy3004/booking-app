import express from "express";
import { check } from "express-validator";

import authController from "../controllers/auth.controller";
import verifyToken from "../middleware/auth.middleware";

const router = express.Router();

router.post(
  "/login",
  [
    check("email", "Email is invalid").isEmail(),
    check("password", "Password with 6 or more characters required").isLength({
      min: 6,
    }),
  ],
  authController.login
);

router.get("/validate-token", verifyToken, authController.validateToken);

router.post("/logout", authController.logout);

export default router;
