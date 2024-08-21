type HotelImagesProps = {
  urlImages: string[];
};

const HotelImages = ({ urlImages }: HotelImagesProps) => {
  const maxImages = 5;
  const imagesToShow = urlImages.slice(0, maxImages);
  const imageCount = imagesToShow.length;

  const gridCols =
    imageCount < 4 ? `grid-cols-${imageCount}` : "grid-cols-4 grid-rows-2";

  const gridSpan = (index: number) => {
    if (imageCount === 1 || imageCount === 2) {
      return "col-span-1";
    } else if (imageCount === 3) {
      return index === 0 ? "col-span-2 row-span-2" : "col-span-1";
    } else if (imageCount === 4) {
      return "col-span-2";
    } else {
      return index === 0 ? "col-span-2 row-span-2" : "col-span-1 row-span-1";
    }
  };

  return (
    <div className={`grid gap-2 ${gridCols}`}>
      {imagesToShow.map((url, index) => (
        <div key={index} className={`relative ${gridSpan(index)}`}>
          <img
            src={url}
            alt={`Image ${index + 1}`}
            className="w-full h-full object-cover rounded"
          />
          {index === maxImages - 1 && urlImages.length > maxImages && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded">
              <span className="text-white text-2xl font-bold">
                +{urlImages.length - maxImages} photos
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default HotelImages;
