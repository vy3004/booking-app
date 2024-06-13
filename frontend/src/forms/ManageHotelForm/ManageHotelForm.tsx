import { FormProvider, useForm } from "react-hook-form";

import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestsSection from "./GuestsSection";
import ImagesSection from "./ImagesSection";

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
};

type ManageHotelFormProps = {
  onSave: (hotelFormData: FormData) => void;
  isLoading: boolean;
};

const ManageHotelForm = ({ onSave, isLoading }: ManageHotelFormProps) => {
  const formMethods = useForm<HotelFormData>();
  const { handleSubmit } = formMethods;

  const onSubmit = handleSubmit((formDataJSON: HotelFormData) => {
    console.log(formDataJSON);

    const formData = new FormData();
    formData.append("name", formDataJSON.name);
    formData.append("description", formDataJSON.description);
    formData.append("city", formDataJSON.city);
    formData.append("country", formDataJSON.country);
    formData.append("type", formDataJSON.type);
    formData.append("adultCount", String(formDataJSON.adultCount));
    formData.append("childCount", String(formDataJSON.childCount));
    formData.append("facilities", formDataJSON.facilities.join(","));
    formData.append("pricePerNight", String(formDataJSON.pricePerNight));
    formData.append("starRating", String(formDataJSON.starRating));
    Array.from(formDataJSON.imageFiles).forEach((imageFile) => {
      formData.append(`imageFiles`, imageFile);
    });

    onSave(formData);
  });

  return (
    <FormProvider {...formMethods}>
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
