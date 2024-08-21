import { useState } from "react";
import { useQuery } from "react-query";

import HotelCard, { HotelCardSkeleton } from "../components/HotelCard";
import Pagination from "../components/Pagination";
import HotelFilter from "../components/HotelFilter";
import HotelSort from "../components/HotelSort";
import PriceFilter from "../components/PriceFilter";
import HotelSelectedTags from "../components/HotelSelectedTags";

import * as apiClient from "../api-client";

import useDebounce from "../hooks/useDebounce";
import { useSearchContext } from "../contexts/SearchContext";
import { ensureDate, formatCurrency } from "../utils/formatString";
import {
  hotelFacilities,
  hotelRatings,
  hotelTypes,
} from "../configs/hotel-options";

const Search = () => {
  const search = useSearchContext();

  const [page, setPage] = useState<number>(1);
  const [selectedStars, setSelectedStars] = useState<string[]>([]);
  const [selectedHotelTypes, setSelectedHotelTypes] = useState<string[]>([]);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [selectedMinPrice, setSelectedMinPrice] = useState<number>();
  const [selectedMaxPrice, setSelectedMaxPrice] = useState<number>();
  const [initialRangePrice, setInitialRangePrice] = useState<
    | {
        minPrice: number;
        maxPrice: number;
      }
    | undefined
  >(undefined);
  const [sortOption, setSortOption] = useState<string>("");

  // Debounce selectedMinPrice and selectedMaxPrice values after 0.5s
  const debouncedMinPrice = useDebounce(selectedMinPrice, 500);
  const debouncedMaxPrice = useDebounce(selectedMaxPrice, 500);

  const searchParams = {
    destination: search.destination,
    checkIn: ensureDate(search.dateValue?.startDate),
    checkOut: ensureDate(search.dateValue?.endDate),
    adultCount: search.adultCount.toString(),
    childCount: search.childCount.toString(),
    page: page.toString(),
    stars: selectedStars,
    types: selectedHotelTypes,
    facilities: selectedFacilities,
    maxPrice: debouncedMaxPrice?.toString(),
    minPrice: debouncedMinPrice?.toString(),
    sortOption,
  };

  const { data: hotelData, isFetching } = useQuery(
    ["searchHotels", searchParams],
    () => apiClient.searchHotels(searchParams),
    {
      onSuccess: (data) => {
        if (initialRangePrice === undefined) {
          setInitialRangePrice({
            minPrice: data.rangePrice.minPrice,
            maxPrice: data.rangePrice.maxPrice,
          });
        }
      },
    }
  );

  const handleStarsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const starRating = event.target.value;

    setSelectedStars((prevStars) =>
      event.target.checked
        ? [...prevStars, starRating]
        : prevStars.filter((star) => star !== starRating)
    );
  };

  const handleHotelTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const hotelType = event.target.value;

    setSelectedHotelTypes((prevHotelTypes) =>
      event.target.checked
        ? [...prevHotelTypes, hotelType]
        : prevHotelTypes.filter((hotel) => hotel !== hotelType)
    );
  };

  const handleFacilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const facility = event.target.value;

    setSelectedFacilities((prevFacilities) =>
      event.target.checked
        ? [...prevFacilities, facility]
        : prevFacilities.filter((prevFacility) => prevFacility !== facility)
    );
  };

  const handlePriceChange = (min: number, max: number) => {
    if (
      min !== hotelData?.rangePrice.minPrice ||
      max !== hotelData?.rangePrice.maxPrice
    ) {
      setSelectedMinPrice(min);
      setSelectedMaxPrice(max);
    }
  };

  const removeSelectedTag = (tag: string, type: string) => {
    if (type === "stars") {
      setSelectedStars(selectedStars.filter((t) => t !== tag));
    } else if (type === "types") {
      setSelectedHotelTypes(selectedHotelTypes.filter((t) => t !== tag));
    } else if (type === "facilities") {
      setSelectedFacilities(selectedFacilities.filter((t) => t !== tag));
    }
  };

  const removeAllSelectedTags = () => {
    setSelectedStars([]);
    setSelectedHotelTypes([]);
    setSelectedFacilities([]);
    setSelectedMinPrice(hotelData?.rangePrice?.minPrice);
    setSelectedMaxPrice(hotelData?.rangePrice?.maxPrice);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-5">
      <div className="rounded-lg border border-slate-300 p-5 h-fit sticky top-10">
        <div className="space-y-5">
          <h3 className="text-lg font-semibold">Filter by:</h3>
          <div className="border-t border-slate-300 pt-5">
            <h4 className="font-bold mb-2">Your budget (per night)</h4>
            <div>
              <span>
                {formatCurrency(
                  selectedMinPrice || hotelData?.rangePrice.minPrice || 0
                )}
              </span>{" "}
              -{" "}
              <span>
                {formatCurrency(
                  selectedMaxPrice || hotelData?.rangePrice.maxPrice || 0
                )}
              </span>
            </div>
            {initialRangePrice && (
              <PriceFilter
                defaultMin={initialRangePrice.minPrice}
                defaultMax={initialRangePrice.maxPrice}
                currentMin={selectedMinPrice ?? initialRangePrice.minPrice}
                currentMax={selectedMaxPrice ?? initialRangePrice.maxPrice}
                step={100000}
                onChange={handlePriceChange}
              />
            )}
          </div>

          <HotelFilter
            title="Hotel Type"
            values={hotelTypes}
            selectedValues={selectedHotelTypes}
            onChange={handleHotelTypeChange}
          />
          <HotelFilter
            title="Property Rating"
            values={hotelRatings}
            selectedValues={selectedStars}
            onChange={handleStarsChange}
          />
          <HotelFilter
            title="Facilities"
            values={hotelFacilities}
            selectedValues={selectedFacilities}
            onChange={handleFacilityChange}
          />
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <div className="text-xl">
            {hotelData?.pagination.total} hotels found{" "}
            {search.destination ? "in " : ""}
            <span className="font-bold text-blue-500">
              {search.destination}
            </span>
          </div>
          <div>
            <span className="mr-2 font-semibold">Sort by</span>
            <HotelSort value={sortOption} onChange={setSortOption} />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <HotelSelectedTags
            selectedTags={selectedStars}
            removeSelectedTag={(tag) => removeSelectedTag(tag, "stars")}
          />
          <HotelSelectedTags
            selectedTags={selectedHotelTypes}
            removeSelectedTag={(tag) => removeSelectedTag(tag, "types")}
          />
          <HotelSelectedTags
            selectedTags={selectedFacilities}
            removeSelectedTag={(tag) => removeSelectedTag(tag, "facilities")}
          />
          {[...selectedStars, ...selectedHotelTypes, ...selectedFacilities]
            .length > 2 && (
            <div
              className="flex items-center px-3 py-1 text-sm font-medium bg-blue-500 hover:bg-blue-600 text-white rounded-full cursor-pointer"
              onClick={removeAllSelectedTags}
            >
              Clear all
            </div>
          )}
        </div>

        {isFetching
          ? [...Array(3)].map((_, i) => <HotelCardSkeleton key={i} />)
          : hotelData?.data.map((hotel) => (
              <HotelCard
                key={hotel._id}
                hotel={hotel}
                link={`/hotels/${hotel._id}`}
              />
            ))}

        <div>
          <Pagination
            page={hotelData?.pagination.page || 1}
            pages={hotelData?.pagination.pages || 1}
            onChangePage={setPage}
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
