import { IoBedOutline, IoAirplaneOutline, IoCarOutline } from "react-icons/io5";
import {
  MdOutlineCardTravel,
  MdOutlineAttractions,
  MdOutlineLocalTaxi,
} from "react-icons/md";

const Navbar = () => {
  return (
    <div className="bg-blue-800 pb-16">
      <div className="container mx-auto flex gap-2 text-white children:px-3.5 children:py-2 children:rounded-full children:flex children:items-center children:gap-1">
        <button className="bg-blue-500/95 border">
          <IoBedOutline className="size-5" />
          Stays
        </button>
        <button className="hover:bg-blue-500/95">
          <IoAirplaneOutline className="size-5" />
          Flights
        </button>
        <button className="hover:bg-blue-500/95">
          <MdOutlineCardTravel className="size-5" />
          Flight + Hotel
        </button>
        <button className="hover:bg-blue-500/95">
          <IoCarOutline className="size-5" />
          Car rentals
        </button>
        <button className="hover:bg-blue-500/95">
          <MdOutlineAttractions className="size-5" />
          Attractions
        </button>
        <button className="hover:bg-blue-500/95">
          <MdOutlineLocalTaxi className="size-5" /> Airport taxis
        </button>
      </div>
    </div>
  );
};

export default Navbar;
