import Property from "../../models/property.model.js";
import { uploadOnCloudinary, uploadSingleImage } from "../../services/cloudinary.service.js";

export const createProperty = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    const { title,description,propertyType,address,city,rent,
      deposit,sharingType,genderPreference,amenities,rules,} = req.body;
      
      if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!title || !description || !propertyType || !address || !city || !rent || !sharingType) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "At least one image required" });
    }

    if(description.length < 20 || description.length > 2000){
        return res.status(400).json({message: "Description must be between 20 and 2000 characters"});
    }

    if(!["PG", "ROOM", "FLAT"].includes(propertyType)){
        return res.status(400).json({message: "Invalid property type"});
    }

    if(rent < 0 || (deposit && deposit < 0)){
        return res.status(400).json({message: "Rent and deposit must be non-negative"});
    }

    const bunchOfURLS = [];

    for (const file of req.files) {
      const url = await uploadSingleImage(
        file.buffer,
        `property_${Date.now()}`
      );
      bunchOfURLS.push(url);
    }

    const property = await Property.create({
      title,
      description,
      propertyType,
      address,
      city,
      rent,
      deposit,
      sharingType,
      genderPreference,
      amenities,
      rules,
      images: bunchOfURLS,
      ownerId: req.user.id, // from auth middleware
    });

    res.status(201).json({
      success: true,
      property,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create property" });
  }
};

export default createProperty;
