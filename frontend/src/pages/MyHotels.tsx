import { useQuery } from "react-query";
import { Link } from "react-router-dom";

import HotelCard from "../components/HotelCard";

import * as apiClient from "../api-client";

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
          <HotelCard
            key={hotel._id}
            hotel={hotel}
            link={`/edit-hotel/${hotel._id}`}
          />
        ))}
      </div>
    </div>
  );
};

export default MyHotels;
