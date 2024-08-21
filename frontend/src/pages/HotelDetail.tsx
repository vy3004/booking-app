import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

import { BiSolidStar } from "react-icons/bi";
import { FaLocationDot } from "react-icons/fa6";

import HotelImages from "../components/HotelImages";

import * as apiClient from "../api-client";

const HotelDetail = () => {
  const { hotelId } = useParams();

  const { data: hotel } = useQuery(
    "getHotelById",
    () => apiClient.getHotelById(hotelId as string),
    {
      enabled: !!hotelId,
    }
  );

  if (!hotel) {
    return <div>No hotel found</div>;
  }

  return (
    <div className="space-y-5">
      <div className="space-y-1">
        <div className="flex items-center">
          <span className="mr-2 text-xs font-bold text-gray-50 border rounded-md px-1 py-0.5 bg-blue-500">
            {hotel.type}
          </span>
          {[...Array(hotel.starRating)].map((_, i) => (
            <BiSolidStar key={i} className="size-4 text-yellow-400" />
          ))}
        </div>
        <div className="text-2xl line-clamp-1 font-bold w-fit">
          {hotel.name}
        </div>
        <div className="flex items-center">
          <div>
            <FaLocationDot className="size-5 text-blue-500 mr-1" />
          </div>
          <span className="text-sm">{`${hotel.city}, ${hotel.country}`}</span>
        </div>
      </div>

      <div className="w-full grid grid-cols-4 gap-4 border">
        <div className="col-span-3 space-y-4">
          <HotelImages urlImages={hotel.imageUrls} />

          <div
            className="break-words whitespace-pre-line"
            dangerouslySetInnerHTML={{ __html: hotel.description }}
          />

          <div>
            <span className="text-lg font-bold">Most popular facilities</span>
            <div className="flex gap-1 items-center mt-2">
              {hotel.facilities.map((facility: string) => (
                <span
                  key={facility}
                  className="px-3 py-2 border rounded whitespace-nowrap"
                >
                  {facility}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="border border-yellow-500 col-span-1 h-screen sticky top-0">
          <div>
            <input type="text" placeholder="Check in" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetail;
