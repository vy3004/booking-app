import express from "express";
import multer from "multer";
import { body } from "express-validator";

import verifyToken from "../middleware/auth.middleware";
import * as HotelController from "../controllers/hotel.controller";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

router.post(
  "/",
  verifyToken,
  [
    body("name", "Name is required").notEmpty(),
    body("description", "Description is required").notEmpty(),
    body("city", "City is required").notEmpty(),
    body("country", "Country is required").notEmpty(),
    body("type", "Hotel type is required").notEmpty(),
    body("facilities", "Facilities are required").notEmpty().isArray(),
    body("pricePerNight", "Price per night is required and must be a number")
      .notEmpty()
      .isNumeric(),
  ],
  upload.array("imageFiles", 6),
  HotelController.createHotel
);

router.get("/", verifyToken, HotelController.getHotels);

export default router;
