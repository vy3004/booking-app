import { FormEvent, useState } from "react";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";
import { LuUser } from "react-icons/lu";
import { TbMapSearch } from "react-icons/tb";

import { useSearchContext } from "../contexts/SearchContext";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const search = useSearchContext();
  const navigate = useNavigate();

  const [destination, setDestination] = useState<string>(search.destination);
  const [dateValue, setDateValue] = useState<DateValueType>(search.dateValue);
  const [adultCount, setAdultCount] = useState<number>(search.adultCount);
  const [childCount, setChildCount] = useState<number>(search.childCount);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("search result: ", {
      destination,
      dateValue,
      adultCount,
      childCount,
    });

    search.saveSearchValues(destination, dateValue, adultCount, childCount);

    navigate("/search");
  };

  return (
    <div className="container mx-auto">
      <form
        onSubmit={handleSubmit}
        className="-mt-8 p-1 rounded-lg bg-yellow-500 flex gap-1 flex-col md:flex-row"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1 w-full">
          <div className="flex items-center flex-1 bg-white p-3 rounded-md">
            <input
              type="text"
              placeholder="Where are you going?"
              className="text-md w-full focus:outline-none"
              value={destination}
              onChange={(event) => setDestination(event.target.value)}
            />
            <TbMapSearch className="size-6" />
          </div>
          <Datepicker
            containerClassName={
              "relative h-full p-3 rounded-md border bg-white"
            }
            inputClassName={"text-md h-full w-full focus:outline-none"}
            toggleClassName={
              "absolute right-0 top-0 h-full px-3 text-gray-900 children:size-6 children:bg-white focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed"
            }
            placeholder="Check-in date — Check-out date"
            minDate={new Date()}
            maxDate={
              new Date(new Date().setFullYear(new Date().getFullYear() + 1))
            }
            displayFormat="ddd D MMM"
            separator="—"
            value={dateValue}
            onChange={(newValue) => setDateValue(newValue)}
          />
          <div className="flex items-center justify-between bg-white p-3 rounded-md">
            <div className="flex items-center gap-1">
              <label className="flex items-center gap-1">
                Adult:
                <input
                  type="number"
                  className="text-md w-full focus:outline-none"
                  value={adultCount}
                  min={1}
                  max={20}
                  onChange={(event) =>
                    setAdultCount(parseInt(event.target.value))
                  }
                />
              </label>
              <label className="flex items-center gap-1">
                Children:
                <input
                  type="number"
                  className="text-md w-full focus:outline-none"
                  min={0}
                  max={20}
                  value={childCount}
                  onChange={(event) =>
                    setChildCount(parseInt(event.target.value))
                  }
                />
              </label>
            </div>
            <LuUser className="size-6" />
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-800 px-5 py-2 rounded-md text-white text-xl font-medium"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
