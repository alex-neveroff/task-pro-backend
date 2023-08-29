import { v2 as cloudinary } from "cloudinary";

const { CLOUDINARY_NAME, CLOUDINARY_KEY, CLOUDINARY_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_KEY,
  api_secret: CLOUDINARY_SECRET,
});

const getBackground = async () => {
  const bcgName = "tree";
  const display = "tablet";
  const publicId = `backgrounds/${bcgName}-${display}`;

  const backgroundUrl = cloudinary.url(publicId, {
    secure: true,
  });

  return backgroundUrl;
};

export default getBackground;
