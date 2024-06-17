import { useQuery } from "react-query";
import { Link } from "react-router-dom";

import { BiMoney, BiSolidStar } from "react-icons/bi";
import { LuBed, LuBuilding, LuMapPin, LuPenSquare } from "react-icons/lu";

import * as apiClient from "../api-client";
import { formatCurrency } from "../utils/formatString";
import { HotelType } from "../../../backend/src/types";

const HotelProperty = ({
  icon,
  content,
}: {
  icon: JSX.Element;
  content: string;
}) => {
  return (
    <div className="flex items-center gap-1">
      {icon}
      <span className="line-clamp-1 w-fit">{content}</span>
    </div>
  );
};

const HotelCard = ({ hotel }: { hotel: HotelType }) => {
  return (
    <div className="relative group">
      <div className="h-full flex border border-slate-300 rounded-lg p-4 gap-5">
        <img
          className="size-48 object-cover rounded-lg"
          src={hotel.imageUrls[0]}
          alt={hotel.name}
        />
        <div className="h-full flex flex-col justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl line-clamp-1 font-bold w-fit">
              {hotel.name}
            </span>
            <div className="flex">
              {[...Array(hotel.starRating)].map((_, i) => (
                <BiSolidStar key={i} className="size-5 text-yellow-400" />
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <HotelProperty
              icon={<LuMapPin />}
              content={`${hotel.city}, ${hotel.country}`}
            />
            <HotelProperty icon={<LuBuilding />} content={hotel.type} />
            <HotelProperty
              icon={<LuBed />}
              content={`${hotel.adultCount} adults, ${hotel.childCount} children`}
            />
            <HotelProperty
              icon={<BiMoney />}
              content={`${formatCurrency(hotel.pricePerNight)} for per night`}
            />
          </div>
        </div>
      </div>
      <Link
        to={`/edit-hotel/${hotel._id}`}
        className="absolute inset-0 flex items-center justify-center gap-2 rounded-lg bg-gray-900 text-white text-xl font-bold bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <LuPenSquare className="size-8" /> View Details
      </Link>
    </div>
  );
};

const MyHotels = () => {
  const { data: hotelData } = useQuery("getMyHotels", apiClient.getMyHotels, {
    onError: (error: Error) => {
      console.log(error);
    },
  });

  if (!hotelData) return <div>Loading...</div>;

  return (
    <div className="space-y-5">
      <span className="flex justify-between">
        <h1 className="text-3xl font-bold">My Hotels</h1>
        <Link
          className="bg-blue-500 hover:bg-blue-800 text-white font-medium px-3 py-2 rounded-md"
          to="/add-hotel"
        >
          Add Hotel
        </Link>
      </span>
      <div className="grid grid-flow-col-1 xl:grid-cols-2 gap-8">
        {hotelData.map((hotel) => (
          <HotelCard key={hotel._id} hotel={hotel} />
        ))}
      </div>
    </div>
  );
};

export default MyHotels;
