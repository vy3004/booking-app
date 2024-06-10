import express from "express";
import { check } from "express-validator";

import * as UserController from "../controllers/user.controller";

const router = express.Router();

router.post(
  "/register",
  [
    check("firstName", "First Name is required").isString(),
    check("lastName", "Last Name is required").isString(),
    check("email", "Email is invalid").isEmail(),
    check("password", "Password with 6 or more characters required").isLength({
      min: 6,
    }),
  ],
  UserController.register
);

export default router;
