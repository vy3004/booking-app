import { Controller, useFormContext } from "react-hook-form";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { HotelFormData } from "./ManageHotelForm";

const DetailsSection = () => {
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext<HotelFormData>();

  return (
    <div className="flex flex-col gap-4">
      <label className="text-gray-700 text-sm font-bold">
        Name
        <input
          type="text"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("name", { required: "This field is required" })}
        />
        {errors.name && (
          <span className="text-red-500">{errors.name.message}</span>
        )}
      </label>
      <div className="flex flex-col md:flex-row gap-5">
        <label className="text-gray-700 text-sm font-bold flex-1">
          City
          <input
            type="text"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("city", { required: "This field is required" })}
          />
          {errors.city && (
            <span className="text-red-500">{errors.city.message}</span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Country
          <input
            type="text"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("country", { required: "This field is required" })}
          />
          {errors.country && (
            <span className="text-red-500">{errors.country.message}</span>
          )}
        </label>
      </div>
      <label className="text-gray-700 text-sm font-bold">
        Description
        <Controller
          name="description"
          control={control}
          rules={{ required: "This field is required" }}
          render={({ field }) => (
            <ReactQuill
              className="font-normal"
              theme="snow"
              placeholder="Write something..."
              value={field.value || ""}
              onChange={field.onChange}
            />
          )}
        />
        {errors.description && (
          <span className="text-red-500">{errors.description.message}</span>
        )}
      </label>
      <div className="flex flex-col md:flex-row gap-5">
        <label className="text-gray-700 text-sm font-bold flex-1">
          Price Per Night
          <input
            type="number"
            min={1}
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("pricePerNight", {
              required: "This field is required",
            })}
          />
          {errors.pricePerNight && (
            <span className="text-red-500">{errors.pricePerNight.message}</span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Star Rating
          <select
            {...register("starRating", { required: "This field is required" })}
            className="border rounded w-full py-1 px-2 font-normal"
          >
            <option value="" className="text-sm font-bold">
              Select as Rating
            </option>
            {[...Array(5)].map((_, index) => (
              <option
                key={index}
                value={index + 1}
                className="text-sm font-bold"
              >
                {index + 1}
              </option>
            ))}
          </select>
          {errors.starRating && (
            <span className="text-red-500">{errors.starRating.message}</span>
          )}
        </label>
      </div>
    </div>
  );
};

export default DetailsSection;
