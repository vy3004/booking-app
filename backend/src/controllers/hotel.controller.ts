import { Request, Response } from "express";
import { validationResult } from "express-validator";

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

export const searchHotels = async (req: Request, res: Response) => {
  try {
    const query = constructSearchQuery(req.query);

    let sortOptions = {};
    switch (req.query.sortOption) {
      case "starRating":
        sortOptions = { starRating: -1 };
        break;
      case "pricePerNightAsc":
        sortOptions = { pricePerNight: 1 };
        break;
      case "pricePerNightDesc":
        sortOptions = { pricePerNight: -1 };
        break;
    }

    const pageSize = 5;
    const pageNumber = parseInt(
      req.query.page ? req.query.page.toString() : "1"
    );
    const skip = (pageNumber - 1) * pageSize;

    const [hotels, total, rangePrice] = await Promise.all([
      Hotel.find(query).sort(sortOptions).skip(skip).limit(pageSize),
      Hotel.countDocuments(query),
      Hotel.aggregate([
        // { $match: query },
        {
          $group: {
            _id: null,
            minPrice: { $min: "$pricePerNight" },
            maxPrice: { $max: "$pricePerNight" },
          },
        },
      ]),
    ]);

    const response = {
      data: hotels,
      pagination: {
        total,
        page: pageNumber,
        pages: Math.ceil(total / pageSize),
      },
      rangePrice: {
        minPrice: rangePrice[0]?.minPrice || 0,
        maxPrice: rangePrice[0]?.maxPrice || 1000000000,
      },
    };

    res.json(response);
  } catch (error) {
    console.error("Error searching hotels ", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const constructSearchQuery = (queryParams: any) => {
  let constructedQuery: any = {};

  if (queryParams.destination) {
    constructedQuery.$or = [
      { city: new RegExp(queryParams.destination, "i") },
      { country: new RegExp(queryParams.destination, "i") },
    ];
  }

  if (queryParams.adultCount) {
    constructedQuery.adultCount = {
      $gte: parseInt(queryParams.adultCount),
    };
  }

  if (queryParams.childCount) {
    constructedQuery.childCount = {
      $gte: parseInt(queryParams.childCount),
    };
  }

  if (queryParams.facilities) {
    constructedQuery.facilities = {
      $all: Array.isArray(queryParams.facilities)
        ? queryParams.facilities
        : [queryParams.facilities],
    };
  }

  if (queryParams.types) {
    constructedQuery.type = {
      $in: Array.isArray(queryParams.types)
        ? queryParams.types
        : [queryParams.types],
    };
  }

  if (queryParams.stars) {
    const starRatings = Array.isArray(queryParams.stars)
      ? queryParams.stars.map((star: string) => parseInt(star))
      : parseInt(queryParams.stars);

    constructedQuery.starRating = { $in: starRatings };
  }

  if (queryParams.minPrice || queryParams.maxPrice) {
    constructedQuery.pricePerNight = {};
    if (queryParams.minPrice) {
      constructedQuery.pricePerNight.$gte = parseInt(queryParams.minPrice);
    }
    if (queryParams.maxPrice) {
      constructedQuery.pricePerNight.$lte = parseInt(queryParams.maxPrice);
    }
  }

  return constructedQuery;
};

export const getHotelById = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }

  const hotelId = req.params.hotelId.toString();

  try {
    const hotel = await Hotel.findById(hotelId);

    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    res.json(hotel);
  } catch (error) {
    console.log("Error get hotel by id ", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
