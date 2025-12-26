import express from "express";
import { uploadOnCloudinary } from "../services/cloudinary.service.js";
import { upload } from "../services/multer.service.js";

const uploadRouter = express.Router();

uploadRouter.post("/multiple", upload.array("images", 10), async (req, res) => {
  try {
    console.log("request ayi");
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No images uploaded" });
    }

    const uploadedUrls = [];

    for (let i = 0; i < req.files.length; i++) {
      const file = req.files[i];

      const imageUrl = await uploadOnCloudinary(
        file.buffer,
        `property_${Date.now()}_${i}`
      );

      uploadedUrls.push(imageUrl);
    }

    return res.status(200).json({
      message: "Images uploaded successfully",
      images: uploadedUrls,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

export default uploadRouter;
