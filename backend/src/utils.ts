import cloudinary from "cloudinary";

export const uploadImagesToCloudinary = async (
  imageFiles: Express.Multer.File[]
) => {
  const uploadPromises = imageFiles.map(async (imageFile) => {
    const b64 = Buffer.from(imageFile.buffer).toString("base64");
    let dataURI = `data:${imageFile.mimetype};base64,${b64}`;
    const result = await cloudinary.v2.uploader.upload(dataURI);
    return result.url;
  });

  const imageUrls = await Promise.all(uploadPromises);

  return imageUrls;
};
