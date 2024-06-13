import { Request, Response } from "express";
import cloudinary from "cloudinary";

import Hotel, { HotelType } from "../models/hotel.model";

export const createHotel = async (req: Request, res: Response) => {
  try {
    const imageFiles = req.files as Express.Multer.File[];
    const newHotel: HotelType = req.body;

    // Upload images to Cloudinary
    const uploadPromises = imageFiles.map(async (imageFile) => {
      const b64 = Buffer.from(imageFile.buffer).toString("base64");
      let dataURI = `data:${imageFile.mimetype};base64,${b64}`;
      const result = await cloudinary.v2.uploader.upload(dataURI);
      return result.url;
    });

    const imageUrls = await Promise.all(uploadPromises);
    newHotel.imageUrls = imageUrls;
    newHotel.lastUpdated = new Date();
    newHotel.userId = req.userId;

    const hotel = new Hotel(newHotel);
    await hotel.save();

    res.status(201).send(hotel);
  } catch (error) {
    console.error("Error creating hotel ", error);
    res.status(500).send("Something went wrong");
  }
};
