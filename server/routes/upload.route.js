const express = require("express");
const multer = require("multer");
const { uploadOnCloudinary } = require("../services/cloudinary.service");

const uploadRouter = express.Router();

// Multer config
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
    files: 10,
  },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      cb(new Error("Only image files allowed"), false);
    } else {
      cb(null, true);
    }
  },
});

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

module.exports = uploadRouter;
