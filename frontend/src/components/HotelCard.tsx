import { Link } from "react-router-dom";

import { BiSolidStar } from "react-icons/bi";
import { LuBed } from "react-icons/lu";

import { formatCurrency } from "../utils/formatString";
import { HotelType } from "../../../backend/src/types";

type HotelCardProps = {
  hotel: HotelType;
  link: string;
};

const HotelCard = ({ hotel, link }: HotelCardProps) => {
  return (
    <div className="flex border rounded-lg shadow-lg gap-5">
      <Link to={link} className="overflow-hidden rounded-l-lg">
        <img
          className="size-52 object-cover hover:scale-110 transition duration-500 ease-in-out"
          src={hotel.imageUrls[0]}
          alt={hotel.name}
        />
      </Link>
      <div className="h-full py-3 flex flex-col justify-between">
        <div>
          <div className="flex items-center">
            <span className="mr-2 text-xs font-bold text-gray-50 border rounded-md px-1 py-0.5 bg-blue-500">
              {hotel.type}
            </span>
            {[...Array(hotel.starRating)].map((_, i) => (
              <BiSolidStar key={i} className="size-4 text-yellow-400" />
            ))}
          </div>
          <Link
            to={link}
            className="text-xl hover:text-blue-500 line-clamp-1 font-bold w-fit"
          >
            {hotel.name}
          </Link>
          <span className="text-sm text-gray-600">{`${hotel.city}, ${hotel.country}`}</span>
        </div>
        <hr />
        <div className="space-y-2">
          <div className="flex items-center gap-1">
            <LuBed />
            <span className="line-clamp-1 w-fit">{`${hotel.adultCount} adults, ${hotel.childCount} children`}</span>
          </div>

          <div className="flex gap-1 items-center">
            {hotel.facilities.slice(0, 3).map((facility) => (
              <span
                key={facility}
                className="bg-slate-300 p-1 rounded-lg font-bold text-xs whitespace-nowrap"
              >
                {facility}
              </span>
            ))}
            <span className="text-sm">
              {hotel.facilities.length > 3 &&
                `+${hotel.facilities.length - 3} more`}
            </span>
          </div>
          <div>
            From:{" "}
            <span className="font-bold">
              {formatCurrency(hotel.pricePerNight)}
            </span>{" "}
            / night
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;

export const HotelCardSkeleton = () => (
  <div className="flex border rounded-lg shadow-lg gap-5">
    <div className="rounded-l-lg w-52 h-52 animate-pulse bg-slate-300" />
    <div className="h-full py-3 flex flex-col justify-between">
      <div className="space-y-2">
        <div className="rounded w-20 h-5 animate-pulse bg-slate-300" />
        <div className="rounded w-44 h-6 animate-pulse bg-slate-300" />
        <div className="rounded w-28 h-5 animate-pulse bg-slate-300" />
      </div>
      <hr />
      <div className="space-y-2">
        <div className="rounded w-36 h-5 animate-pulse bg-slate-300" />

        <div className="flex gap-1 items-center">
          <div className="rounded w-10 h-5 animate-pulse bg-slate-300" />
          <div className="rounded w-10 h-5 animate-pulse bg-slate-300" />
          <div className="rounded w-10 h-5 animate-pulse bg-slate-300" />
          <div className="rounded w-10 h-5 animate-pulse bg-slate-300" />
          <div className="rounded w-10 h-5 animate-pulse bg-slate-300" />
        </div>
        <div className="rounded w-40 h-5 animate-pulse bg-slate-300" />
      </div>
    </div>
  </div>
);
