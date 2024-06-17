import { Request, Response } from "express";

import Hotel from "../models/hotel.model";
import { HotelType } from "../types";

import { uploadImagesToCloudinary } from "../utils";

export const createHotel = async (req: Request, res: Response) => {
  try {
    const newHotel: HotelType = req.body;
    const imageFiles = req.files as Express.Multer.File[];

    const imageUrls = await uploadImagesToCloudinary(imageFiles);
    newHotel.imageUrls = imageUrls;
    newHotel.lastUpdated = new Date();
    newHotel.userId = req.userId;

    const hotel = new Hotel(newHotel);
    await hotel.save();

    res.status(201).send(hotel);
  } catch (error) {
    console.error("Error creating hotel ", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getMyHotels = async (req: Request, res: Response) => {
  try {
    const hotels = await Hotel.find({ userId: req.userId });
    res.send(hotels);
  } catch (error) {
    console.error("Error getting hotels ", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getMyHotelById = async (req: Request, res: Response) => {
  try {
    const hotel = await Hotel.findOne({
      _id: req.params.hotelId,
      userId: req.userId,
    });
    res.json(hotel);
  } catch (error) {
    console.error("Error getting hotel ", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const updateMyHotelById = async (req: Request, res: Response) => {
  try {
    const updateHotel: HotelType = req.body;
    updateHotel.lastUpdated = new Date();

    const hotel = await Hotel.findOneAndUpdate(
      {
        _id: req.params.hotelId,
        userId: req.userId,
      },
      updateHotel,
      { new: true }
    );

    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    const imageFiles = req.files as Express.Multer.File[];
    const updateImageUrls = await uploadImagesToCloudinary(imageFiles);

    hotel.imageUrls = [...updateImageUrls, ...(updateHotel.imageUrls || [])];

    await hotel.save();

    res.status(200).json(hotel);
  } catch (error) {
    console.error("Error updating hotel ", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
