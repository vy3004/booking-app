import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const GuestsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div>
      <h2 className="font-bold mb-2">Guests</h2>
      <div className="grid grid-cols-2 gap-5 p-6 bg-gray-300 rounded">
        <label className="text-gray-700 text-sm font-bold">
          Adult
          <input
            type="number"
            className="border rounded w-full py-1 px-2 font-normal"
            min={1}
            {...register("adultCount", {
              required: "This field is required",
            })}
          />
          {errors.adultCount && (
            <span className="text-red-500">{errors.adultCount.message}</span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-bold">
          Children
          <input
            type="number"
            className="border rounded w-full py-1 px-2 font-normal"
            min={0}
            {...register("childCount", {
              required: "This field is required",
            })}
          />
          {errors.childCount && (
            <span className="text-red-500">{errors.childCount.message}</span>
          )}
        </label>
      </div>
    </div>
  );
};

export default GuestsSection;
