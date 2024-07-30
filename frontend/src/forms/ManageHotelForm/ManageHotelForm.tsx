import { FormProvider, useForm } from "react-hook-form";

import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestsSection from "./GuestsSection";
import ImagesSection from "./ImagesSection";

import { HotelType } from "../../../../backend/src/types";
import { useEffect } from "react";

export type HotelFormData = {
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
  imageFiles: FileList;
  imageUrls: string[];
};

type ManageHotelFormProps = {
  hotel?: HotelType;
  onSave: (hotelFormData: FormData) => void;
  isLoading: boolean;
};

const ManageHotelForm = ({
  hotel,
  onSave,
  isLoading,
}: ManageHotelFormProps) => {
  const formMethods = useForm<HotelFormData>();
  const { handleSubmit, reset } = formMethods;

  useEffect(() => {
    reset(hotel);
  }, [hotel, reset]);

  const onSubmit = handleSubmit((formDataJSON: HotelFormData) => {
    console.log(formDataJSON);

    const formData = new FormData();

    if (hotel) {
      formData.append("hotelId", hotel._id);
    }
    formData.append("name", formDataJSON.name);
    formData.append("description", formDataJSON.description);
    formData.append("city", formDataJSON.city);
    formData.append("country", formDataJSON.country);
    formData.append("type", formDataJSON.type);
    formData.append("adultCount", String(formDataJSON.adultCount));
    formData.append("childCount", String(formDataJSON.childCount));
    formDataJSON.facilities.forEach((facility, index) => {
      formData.append(`facilities[${index}]`, facility);
    });
    formData.append("pricePerNight", String(formDataJSON.pricePerNight));
    formData.append("starRating", String(formDataJSON.starRating));
    Array.from(formDataJSON.imageFiles).forEach((imageFile) => {
      formData.append(`imageFiles`, imageFile);
    });
    if (formDataJSON.imageUrls) {
      formDataJSON.imageUrls.forEach((url, index) => {
        formData.append(`imageUrls[${index}]`, url);
      });
    }

    onSave(formData);
  });

  return (
    <FormProvider {...formMethods}>
      <h1 className="text-3xl font-bold mb-4">
        {hotel ? "Edit" : "Add"} Hotel
      </h1>

      <form className="space-y-4" onSubmit={onSubmit}>
        <DetailsSection />
        <TypeSection />
        <FacilitiesSection />
        <GuestsSection />
        <ImagesSection />
        <span className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-500 hover:bg-blue-800 disabled:bg-gray-500 text-white font-bold py-2 px-4 rounded"
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </span>
      </form>
    </FormProvider>
  );
};

export default ManageHotelForm;
