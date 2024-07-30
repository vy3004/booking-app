export type HotelType = {
  _id: string;
  userId: string;
  name: string;
  description: string;
  city: string;
  country: string;
  type: string;
  adultCount: number;
  childCount: number;
  facilities: string[];
  pricePerNight: number;
  starRating: number;
  imageUrls: string[];
  lastUpdated: Date;
};

export type UserType = {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export type HotelSearchResponse = {
  data: HotelType[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
  rangePrice: {
    minPrice: number;
    maxPrice: number;
  };
};
