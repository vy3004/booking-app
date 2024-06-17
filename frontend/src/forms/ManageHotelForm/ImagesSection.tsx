import { useFormContext } from "react-hook-form";

import { LuTrash2 } from "react-icons/lu";

import { HotelFormData } from "./ManageHotelForm";

const ImagesSection = () => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<HotelFormData>();

  const existingImageUrls = watch("imageUrls");

  const handleDeleteImage = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    imageUrl: string
  ) => {
    event.preventDefault();
    setValue(
      "imageUrls",
      existingImageUrls.filter((url) => url !== imageUrl)
    );
  };

  return (
    <div>
      <h2 className="font-bold mb-3">Images</h2>
      <div className="border rounded p-4 flex flex-col gap-4">
        {existingImageUrls && (
          <div className="columns-1 gap-4 sm:columns-2 md:columns-3 lg:columns-4 space-y-4">
            {existingImageUrls.map((imageUrl, index) => (
              <div className="relative group" key={index}>
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="object-cover rounded"
                />

                <div className="absolute inset-0 flex items-center justify-center rounded bg-gray-900 bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity select-none">
                  <button
                    className="flex items-center text-white hover:text-red-500"
                    onClick={(e) => handleDeleteImage(e, imageUrl)}
                  >
                    <LuTrash2 className="size-5" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <input
          className="w-full text-gray-700 font-normal"
          type="file"
          multiple
          accept="image/*"
          {...register("imageFiles", {
            validate: (imageFiles) => {
              const totalLength =
                imageFiles.length + (existingImageUrls?.length || 0);

              if (totalLength === 0) {
                return "At least one image should be uploaded";
              }

              if (totalLength > 6) {
                return "Total number of images cannot be more than 6";
              }

              return true;
            },
          })}
        />
      </div>
      {errors.imageFiles && (
        <span className="text-red-500 font-bold">
          {errors.imageFiles.message}
        </span>
      )}
    </div>
  );
};

export default ImagesSection;
