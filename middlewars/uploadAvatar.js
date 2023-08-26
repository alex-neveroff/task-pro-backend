import { v2 as cloudinary } from "cloudinary";

const uploadAvatar = async (req, res) => {
  const { _id, email } = req.user;
  const fileBuffer = req.file.buffer;
  const fileName = `${_id}_${email}`;

  const options = {
    public_id: `avatars/${fileName}`,
    use_filename: true,
    unique_filename: false,
    overwrite: true,
    transformation: [{ width: 250, height: 250, crop: "fill" }],
    quality: "auto:best",
  };
  try {
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(options, (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        })
        .end(fileBuffer);
    });
    return result.secure_url;
  } catch (error) {
    res.status(400).json({ message: "Image loading error" });
  }
};

export default uploadAvatar;
