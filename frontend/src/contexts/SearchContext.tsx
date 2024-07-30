import { createContext, useContext, useState } from "react";
import { DateValueType } from "react-tailwindcss-datepicker";

type SearchContextType = {
  destination: string;
  // checkIn: DateType;
  // checkOut: DateType;
  dateValue: DateValueType;
  adultCount: number;
  childCount: number;
  hotelId: string;
  saveSearchValues: (
    destination: string,
    // checkIn: DateType,
    // checkOut: DateType,
    dateValue: DateValueType,
    adultCount: number,
    childCount: number
  ) => void;
};

type SearchContextProviderProps = {
  children: React.ReactNode;
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchContextProvider = ({
  children,
}: SearchContextProviderProps) => {
  const [destination, setDestination] = useState<string>("");
  // const [checkIn, setCheckIn] = useState<DateType>(null);
  // const [checkOut, setCheckOut] = useState<DateType>(null);
  const [dateValue, setDateValue] = useState<DateValueType>({
    startDate: null,
    endDate: null,
  });
  const [adultCount, setAdultCount] = useState<number>(1);
  const [childCount, setChildCount] = useState<number>(0);
  const [hotelId, setHotelId] = useState<string>("");

  const saveSearchValues = (
    destination: string,
    // checkIn: DateType,
    // checkOut: DateType,
    dateValue: DateValueType,
    adultCount: number,
    childCount: number,
    hotelId?: string
  ) => {
    setDestination(destination);
    // setCheckIn(checkIn);
    // setCheckOut(checkOut);
    setDateValue(dateValue);
    setAdultCount(adultCount);
    setChildCount(childCount);

    if (hotelId) {
      setHotelId(hotelId);
    }
  };

  return (
    <SearchContext.Provider
      value={{
        destination,
        // checkIn,
        // checkOut,
        dateValue,
        adultCount,
        childCount,
        hotelId,
        saveSearchValues,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSearchContext = () => {
  const context = useContext(SearchContext);
  return context as SearchContextType;
};
