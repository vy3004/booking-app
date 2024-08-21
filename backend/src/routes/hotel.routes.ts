import express from "express";
import multer from "multer";
import { body, param } from "express-validator";

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
  "/my",
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

router.get("/my", verifyToken, HotelController.getMyHotels);

router.get("/my/:hotelId", verifyToken, HotelController.getMyHotelById);

router.put(
  "/my/:hotelId",
  verifyToken,
  upload.array("imageFiles"),
  HotelController.updateMyHotelById
);

router.get("/search", HotelController.searchHotels);

router.get(
  "/:hotelId",
  [param("hotelId").notEmpty().withMessage("Hotel Id is required")],
  HotelController.getHotelById
);

export default router;
